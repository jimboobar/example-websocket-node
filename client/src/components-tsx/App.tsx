import React from "react";
import GameItems from "./GameItems";
import WebSocketButtons from "./WebSocketButtons";

const App = (props: {
    url: string;
}) => (
    <div className="app">
        <WebSocketButtons url={props.url} />
        <GameItems />
    </div>
);

export default App;
