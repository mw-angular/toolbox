<p align="center">
  <img width="250" height="250" src="https://raw.githubusercontent.com/mw-angular/toolbox/main/logo.png">
</p>

# @mw-angular/tailwindcss-builder

This is the [Angular CLI builder](https://angular.io/guide/cli-builder) for [TailwindCSS](https://tailwindcss.com/).

## Getting Started

1. Use the package manager to install library.

```
$ npm install -D postcss autoprefixer @mw-angular/tailwindcss-builder
```

2. Create and configure file `tailwind.config.js`, according to official documentation [here](https://tailwindcss.com/docs/configuration).

You can omit `purge` option, it will be configured or enhanced for particular project automatically.

Example:

```
module.exports = {
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

3. Create CSS file `tailwind.css`. 
   
Example:

```
@import "tailwindcss/base";
@import "./custom-base-styles.css";

@import "tailwindcss/components";
@import "./custom-components.css";

@import "tailwindcss/utilities";
@import "./custom-utilities.css";
```

4. Configure target in `angular.json`.

```
"projects": {
  "website": {
    "architect": {
      ...
      "tailwindcss": {
        "builder": "@mw-angular/tailwindcss-builder:general",
        "options": {
          "themes": [
            {
              "configFile": "libs/design-system/src/styles/tailwind.config.js",
              "cssFile": "libs/design-system/src/styles/tailwind.css",
              "outputPath": "apps/website/src/styles",
              "outputFileName": "my-theme-name"
            }
          ]
        }
      },
      ...
    }
  }
}
```

As you can see, you can configure multiple themes.

5. Run `ng run website:tailwindcss`.

For each theme two files will be created, one for development and one for production.

Don't forget to run this command each time you change tailwind configuration or input css file and before production build.

It is recommended to commit them. 

To use this files add them to `angular.json` file for particular project:

```
"projects": {
  "website": {
    "architect": {
      ...
      "build": {
        "builder": "...",
        "options": {
          ...
          "styles": [
            "apps/website/src/styles/my-theme-name.dev.css"
          ],
          ...
        },
        "configurations": {
          "production": {
            ...
            "styles": [
              "apps/website/src/styles/my-theme-name.css"
            ],
            ...
          }
        }
      },
      "test": {
        "builder": "...",
        "options": {
          ...
          "styles": [
            "apps/website/src/styles/my-theme-name.dev.css"
          ],
          ...
        }
      },
      ...
    }
  }
}
```

## Contributing

Pull requests to the [repository](https://github.com/mw-angular/toolbox) are welcome.
For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors

- **Andrey Korovin** - _misticwonder@gmail.com_

## License

This project is licensed under the terms of the **MIT** license.

You can check out the full license [here](https://raw.githubusercontent.com/mw-angular/toolbox/main/libs/mw-angular/tailwindcss-builder/LICENSE).
