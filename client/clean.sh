#!/usr/bin/env sh

(
    cd "$(dirname $0)"
    
    echo 'Cleaning...'
    rm -rf node_modules/ dist/ package-lock.json
)
