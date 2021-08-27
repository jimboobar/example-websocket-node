#!/usr/bin/env sh

(
    cd "$(dirname $0)"

    docker compose -f docker-env.yaml down
    docker compose -f docker-env.yaml up --remove-orphans
    docker compose -f docker-env.yaml down
)
