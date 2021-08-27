import React from "react";
import Game from "../models/Game";
import GameEvent from "../models/GameEvent";
import GameEventHandler from "../utils/GameEventHandler";
import GameItem from "./GameItem";

export default class GameItems extends React.Component {
    state = {
        items: [] as Game[]
    };

    constructor() {
        super({});

        // Fix - Callback scope
        this.OnItems = this.OnItems.bind(this);
        this.OnCreated = this.OnCreated.bind(this);
        this.OnUpdated = this.OnUpdated.bind(this);
        this.OnRemoved = this.OnRemoved.bind(this);
    }

    componentDidMount() {
        const gameEvent = GameEventHandler.Instance;

        gameEvent.On(GameEvent.ITEMS, this.OnItems);
        gameEvent.On(GameEvent.CREATED, this.OnCreated);
        gameEvent.On(GameEvent.UPDATED, this.OnUpdated);
        gameEvent.On(GameEvent.REMOVED, this.OnRemoved);
    }

    componentWillUnmount() {
        const gameEvent = GameEventHandler.Instance;

        gameEvent.Off(GameEvent.ITEMS, this.OnItems);
        gameEvent.Off(GameEvent.CREATED, this.OnCreated);
        gameEvent.Off(GameEvent.UPDATE, this.OnUpdated);
        gameEvent.Off(GameEvent.REMOVED, this.OnRemoved);
    }

    render() {
        const { items } = this.state;

        return (
            <div className="game-items">
                {items.map((game, index) => (
                    <GameItem key={index} game={game} />
                ))}
            </div>
        );
    }

    private OnItems(event: CustomEvent<Game[]>) {
        const { detail: items } = event;

        this.setState({ items });
    }

    private OnCreated(event: CustomEvent<Game>) {
        const { detail: item } = event;
        const { items } = this.state;

        this.setState({ items: [...items, item] });
    }

    private OnUpdated(event: CustomEvent<Game>) {
        const { detail: item } = event;
        const { items } = this.state;

        this.setState({ items: items.map((game) => (game.id === item.id) ? item : game) });
    }

    private OnRemoved(event: CustomEvent<Game>) {
        const { detail: item } = event;
        const { id } = item;
        const { items } = this.state;

        this.setState({ items: items.filter((game) => game.id !== id) });
    }
}
