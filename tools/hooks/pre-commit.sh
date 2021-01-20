#!/bin/bash

npx lint-staged || exit

npm run lint-ci:website || exit
npm run lint-ci:styleguide || exit

npm run lint-ci:design-system || exit
