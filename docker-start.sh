#!/usr/bin/env sh

(
    cd "$(dirname $0)"

    # Start docker environment
    ./docker/run-env.sh
)
