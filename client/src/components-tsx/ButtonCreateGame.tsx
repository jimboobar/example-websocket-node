import React from "react";
import GameEventHandler from "../utils/GameEventHandler";

const OnClick = () => {
    const games = GameEventHandler.Instance;
    const now = Date.now();

    games.CreateGame({
        id: new Date(now).toISOString(),
        title: `Title ${now}`,
        studio: `Studio ${now}`,
        publisher: `Publisher ${now}`
    });
};

const GameCreateButton = () => (
    <button onClick={OnClick} >Create Game</button>
);

export default GameCreateButton;
