import { Store, StoreItem } from "./Store";

export interface Game extends StoreItem {
    title: string;
    studio: string;
    publisher: string;
}

export default class GameStore extends Store<Game> {
    constructor() {
        super();
    }
}
