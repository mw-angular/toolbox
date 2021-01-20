import { JsonObject } from '@angular-devkit/core';

export interface Theme extends JsonObject {
  configFile: string;
  cssFile: string;
  outputPath: string;
  outputFileName: string;
}

export interface GeneralOptions extends JsonObject {
  themes: Theme[];
}
