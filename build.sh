#!/usr/bin/env sh

(
    cd "$(dirname $0)"

    ./client/build.sh
    ./server/build.sh
)
