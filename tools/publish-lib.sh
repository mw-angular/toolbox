#!/usr/bin/env bash

lib="$1"
type="$2"
basePath="$(pwd)"
branch="$(git rev-parse --abbrev-ref HEAD)"

if [[ "$lib" != "" && "$type" != "" && "$branch" == "main" ]] ; then
    npm whoami 2> /dev/null || npm login || exit

    cd libs/mw-angular/"$lib" || exit
    ver="$(npm version "$type")"

    cd "$basePath" || exit
    git commit --no-verify -am "publish(@mw-angular/$lib) version: $ver"
    git push --no-verify && git push --no-verify --tags

    npm run build:"$lib" || exit

    echo -n "Enter password from your authenticator: "
    read otp

    npm publish dist/mw-angular/"$lib" --access public --otp "$otp"
    exit 0
else
    echo "param errors or git branch is not main"
    exit 1
fi
