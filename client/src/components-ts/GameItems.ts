import Game from "../models/Game";
import GameEvent from "../models/GameEvent";
import GameEventHandler from "../utils/GameEventHandler";
import GameItem from "./GameItem";

const AddGame = (
    div: HTMLDivElement,
    items: Record<string, HTMLElement>,
    game: Game,
) => {
    const divGame = GameItem(game);
    items[game.id] = divGame;
    div.append(divGame);
};

const ClearItems = (
    items: Record<string, HTMLElement>
) => {
    Object.entries(items)
        .filter(({ 0: key }) => (delete items[key]))
        .forEach(({ 1: value }) => (value && value.remove()));
};

const OnItems = (
    div: HTMLDivElement,
    items: Record<string, HTMLElement>,
) => (event: CustomEvent<Game[]>) => {
    const { detail } = event;

    ClearItems(items);
    detail.forEach((game: Game) => AddGame(div, items, game));
};

const OnCreateOrUpdate = (
    div: HTMLDivElement,
    items: Record<string, HTMLElement>,
) => (event: CustomEvent<Game>) => {
    const { detail } = event;
    const { id } = detail;
    const element = items[id];

    if (element) {
        element.dispatchEvent(new CustomEvent("update", { detail }));
    } else {
        AddGame(div, items, detail);
    }
};

const OnRemoved = (
    items: Record<string, HTMLElement>
) => (event: CustomEvent<Game>) => {
    const { detail } = event;
    const { id } = detail;
    const element = items[id];

    if (!element) return;

    element.remove();
    delete items[id];
};

const GameItems = () => {
    const gameEvents = GameEventHandler.Instance;
    const items: Record<string, HTMLElement> = {};
    const div = document.createElement("div");
    const onCreateOrUpdate = OnCreateOrUpdate(div, items);

    div.classList.add("game-items");

    gameEvents.On(GameEvent.ITEMS, OnItems(div, items));
    gameEvents.On(GameEvent.CREATED, onCreateOrUpdate);
    gameEvents.On(GameEvent.UPDATE, onCreateOrUpdate);
    gameEvents.On(GameEvent.REMOVED, OnRemoved(items));

    return div;
};

export default GameItems;
