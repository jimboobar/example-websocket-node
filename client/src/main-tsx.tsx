import React from "react";
import ReactDOM from "react-dom";
import GameEventHandler from "./utils/GameEventHandler";
import App from "./components-tsx/App";

const { hostname, port } = location;

GameEventHandler.Init(document.body);

ReactDOM.render(
    <React.StrictMode>
        <App url={`ws://${hostname}:${port}/games`} />
    </React.StrictMode>,
    document.body
);
