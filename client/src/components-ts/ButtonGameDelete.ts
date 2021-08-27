import Game from "../models/Game";
import GameEventHandler from "../utils/GameEventHandler";

const ButtonGameDelete = (game: Game) => {
    const button = document.createElement('button');

    button.innerText = 'Delete';
    button.onclick = () => GameEventHandler.Instance.RemoveGame(game);

    return button;
};

export default ButtonGameDelete;
