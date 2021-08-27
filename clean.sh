#!/usr/bin/env sh

(
    cd "$(dirname $0)"

    ./client/clean.sh
    ./server/clean.sh
)