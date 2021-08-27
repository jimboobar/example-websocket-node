import Game from "../models/Game";
import GameEvent from "../models/GameEvent";
import EventHandler from "./EventHandler";

export default class GameEventHandler extends EventHandler {
    private static _instance: GameEventHandler;

    static get Instance() {
        if (!this._instance) throw Error('Not initialized');
        return this._instance;
    }

    static Init(target: EventTarget) {
        this._instance = new GameEventHandler(target);
    }

    GameItems(games: Game[]) {
        this.Emit(GameEvent.ITEMS, games);
    }

    CreateGame(game: Game) {
        this.Emit(GameEvent.CREATE, game);
    }
    
    UpdateGame(game: Game) {
        this.Emit(GameEvent.UPDATE, game);
    }
    
    RemoveGame(game: Game) {
        this.Emit(GameEvent.REMOVE, game);
    }
    
    GameCreated(game: Game) {
        this.Emit(GameEvent.CREATED, game);
    }
    
    GameUpdated(game: Game) {
        this.Emit(GameEvent.UPDATED, game);
    }
    
    GameRemoved(game: Game) {
        this.Emit(GameEvent.REMOVED, game);
    }
}
