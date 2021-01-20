#!/bin/bash

git remote add template https://github.com/mw-angular/starter-cli-workspace.git
git fetch --all
git rebase template/main
