#!/bin/bash

sourcePath=libs/mw-angular/tailwindcss-builder
destPath=dist/mw-angular/tailwindcss-builder

rm -rf "$destPath" || exit

tsc -p "$sourcePath"/tsconfig.lib.json || exit

cp "$sourcePath"/builders.json "$destPath" || exit
cp "$sourcePath"/package.json "$destPath" || exit
cp "$sourcePath"/LICENSE "$destPath" || exit
cp "$sourcePath"/README.md "$destPath" || exit

cp "$sourcePath"/src/general/schema.json "$destPath"/general || exit
