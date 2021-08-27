import App from "./components-ts/App";
import GameEventHandler from "./utils/GameEventHandler";

const { hostname, port } = location;

GameEventHandler.Init(document.body);

App({
    webSocketUrl: `ws://${hostname}:${port}/games`,
    root: document.body
});
