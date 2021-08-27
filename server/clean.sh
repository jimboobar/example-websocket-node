#!/usr/bin/env sh

(
    cd "$(dirname $0)"
    
    echo 'Cleaning...'
    rm -rf dist/ node_modules/ public/ package-lock.json
)
