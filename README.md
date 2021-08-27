# WebSocket - NodeJS Server/Client Example
An example project on how to setup communication between server and clients using WebSocket. Working examples included.

_**NOTE:** This is a hacky proof of concept..._

## Requirements
- Docker
- Bash
- NodeJS

## Setup
In a terminal window, run:
- `./build.sh`, to build locally with NodeJS (faster).
- `./docker-build.sh`, to build with docker (slower).
- `./docker-start.sh`, to start server with docker.

## Verify
Open http://localhost:8080/ in multiple browser tabs, or browsers, and press `CONNECT` for some real-time action with WebSockets!

## TODO
- Listen for events using HTTP GET.
