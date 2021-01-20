# DesignSystem

## Icons 

You can find icons in the [repository](https://heroicons.com/).

## Add to new project

1. Follow instructions for [tailwind builder](https://github.com/mw-angular/toolbox/tree/main/libs/mw-angular/tailwindcss-builder#mw-angulartailwindcss-builder)

2. Add assets in build and test targets in `angular.json`

```
"assets": [
  "apps/styleguide/src/favicon.ico",
  "apps/styleguide/src/assets",
  {
    "glob": "**/*",
    "input": "libs/design-system/src/assets",
    "output": "design-system"
  }
],
```

3. Add to `index.html`

```
<link rel="stylesheet" href="design-system/fonts/fonts.css">
```
