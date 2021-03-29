import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import * as fs from 'fs';
import * as path from 'path';
import postcss from 'postcss';

import { GeneralOptions, Theme } from './general-options';

export async function generalBuilder(options: GeneralOptions, context: BuilderContext): Promise<BuilderOutput> {
  context.logger.info(`Building Tailwind CSS...`);

  try {
    for (const theme of options.themes) {
      const css: Buffer = await fs.promises.readFile(theme.cssFile);
      const { sourceRoot }: any = await context.getProjectMetadata(context.target?.project || '');

      await Promise.all([build(theme, context, sourceRoot, css, false), build(theme, context, sourceRoot, css, true)]);
    }

    return { success: true };
  } catch (error) {
    console.error(error);

    return { success: false, error };
  }
}

async function build(
  theme: Theme,
  context: BuilderContext,
  sourceRoot: string,
  css: Buffer,
  isProd: boolean,
): Promise<void> {
  const { purge, ...config }: any = await import(path.join(context.workspaceRoot, theme.configFile));

  const purgeProjectContent: string[] = [`${sourceRoot}/**/*.html`, `${sourceRoot}/**/*.ts`];

  if (Array.isArray(purge)) {
    config.purge = {
      enabled: isProd,
      content: [...new Set([...purge, ...purgeProjectContent])],
    };
  } else if (purge !== undefined) {
    config.purge = {
      ...config.purge,
      enabled: isProd,
      content: [...new Set([...purge.content, ...purgeProjectContent])],
    };
  } else {
    config.purge = {
      enabled: isProd,
      content: [...purgeProjectContent],
    };
  }

  if (!isProd) {
    delete config.purge;
  }

  const result: { css: any; map?: any } = await postcss([
    require('postcss-import'),
    require('tailwindcss')(config),
    require('autoprefixer'),
  ]).process(css, { from: theme.cssFile, to: theme.outputPath });

  const outputFilePath: string = isProd
    ? `${theme.outputPath}/${theme.outputFileName}.css`
    : `${theme.outputPath}/${theme.outputFileName}.dev.css`;

  await fs.promises.writeFile(outputFilePath, result.css);

  context.logger.info(`Created: ${outputFilePath}`);
}
