# StarterCliWorkspace

## Start

```
npm run build-all-libs
npm run tailwindcss:website
npm run start:website
```

## Packages

All dependencies should be installed in `devDependencies`

```
npm i -D <PACKAGE_NAME>
```

## Create

Before creating app or lib set correct value for `newProjectRoot` in `angular.json` to `apps` or `libs` respectively.

```
ng g application --strict
ng g library --prefix=<NEW_LIB_PREFIX>
```
