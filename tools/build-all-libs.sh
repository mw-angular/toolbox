#!/bin/bash

npm run build:design-system || exit
npm run build:core || exit
npm run build:tailwindcss-builder || exit
