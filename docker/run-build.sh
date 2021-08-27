#!/usr/bin/env sh

(
    cd "$(dirname $0)"

    docker compose --file docker-build.yaml down
    docker compose --file docker-build.yaml up --remove-orphans
    docker compose --file docker-build.yaml down
)
