#!/bin/bash

sourcePath=libs/tailwindcss-builder
destPath=dist/tailwindcss-builder

rm -rf "$destPath" || exit

tsc -p "$sourcePath"/tsconfig.lib.json || exit

cp "$sourcePath"/builders.json "$destPath" || exit
cp "$sourcePath"/package.json "$destPath" || exit
cp "$sourcePath"/LICENSE "$destPath" || exit
cp "$sourcePath"/README.md "$destPath" || exit

cp "$sourcePath"/src/general/schema.json "$destPath"/general || exit
