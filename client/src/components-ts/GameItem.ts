import Game from "../models/Game";
import ButtonGameDelete from "./ButtonGameDelete";
import Property from "./Property";

const GameItem = (game: Game) => {
    const div = document.createElement("div");
    const divId = Property("ID", game.id);
    const divTitle = Property("Title", game.title);
    const divStudio = Property("Studio", game.studio);
    const divPublisher = Property("Publisher", game.publisher);
    const button = ButtonGameDelete(game);

    div.classList.add("game-item");
    div.append(divId);
    div.append(divTitle);
    div.append(divStudio);
    div.append(divPublisher);
    div.append(button);
    div.addEventListener("update", (event: CustomEvent<Game>) => {
        const { detail } = event;

        if (!detail || !detail.id || detail.id !== game.id) return;

        divTitle.dispatchEvent(new CustomEvent("update", { detail: detail.title }));
        divStudio.dispatchEvent(new CustomEvent("update", { detail: detail.studio }));
        divPublisher.dispatchEvent(new CustomEvent("update", { detail: detail.publisher }));
    });

    return div;
};

export default GameItem;
