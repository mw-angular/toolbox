#!/bin/bash

npm run test-ci:website || exit
npm run e2e-ci:website || exit

npm run test-ci:styleguide || exit
npm run e2e-ci:styleguide || exit

npm run test-ci:design-system || exit
npm run test-ci:core || exit
