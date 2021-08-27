#!/usr/bin/env sh

(
    cd "$(dirname $0)"

    # Clean previous builds
    ./clean.sh

    # Build with docker environment
    ./docker/run-build.sh
)
