import React from "react";
import Game from "../models/Game";
import GameEventHandler from "../utils/GameEventHandler";
import Property from "./Property";

const GameItem = (props:{
    game: Game
}) => {
    const { game } = props;
    const onClick = () => GameEventHandler.Instance.RemoveGame(game);

    return (<div className="game-item">
        <Property label={'ID'} value={game.id} />
        <Property label={'Title'} value={game.title} />
        <Property label={'Studio'} value={game.studio} />
        <Property label={'Publisher'} value={game.publisher} />
        <button onClick={onClick}>Delete</button>
    </div>);
};

export default GameItem;
