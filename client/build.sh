#!/usr/bin/env sh

(
    cd "$(dirname $0)"
    
    echo 'Installing dependencies...'
    npm i

    echo 'Removing distribution directory...'
    rm -rf dist/

    echo 'Creating distribution directory...'
    mkdir dist

    echo 'Copy content to distribution...'
    cp -R public/* dist/

    echo 'Build source...'
    npm run build:tsx
)
