import { EventEmitter } from "events";

enum Event {
    CREATED = 'created',
    UPDATED = 'updated',
    REMOVED = 'removed'
}

export interface StoreItem {
    id: string;
}

export class Store<T extends StoreItem> {
    public static Event = Event;

    constructor(
        protected Items: Record<string, T> = {},
        public readonly Emitter: EventEmitter = new EventEmitter()
    ) { }

    Create(item: T): T {
        const { Emitter, Items } = this;

        if (!item) throw Error(`Invalid: missing item`);
        if (!item.id) throw Error(`Invalid: item.id ${item.id}`);
        if (Items[item.id]) throw Error(`Error: exists, ${item.id}`);

        Items[item.id] = item;

        Emitter.emit(Event.CREATED, item);

        return item;
    }

    Read(id: string): T {
        const { Items } = this;

        if (!id) throw Error(`Invalid: item.id, ${id}`);

        const item = Items[id];

        if (!item) throw Error(`Error: does not exist, ${id}`);

        return item;
    }

    Update(item: T): T {
        const { Emitter, Items } = this;

        if (!item) throw Error(`Invalid: item`);
        if (!item.id) throw Error(`Invalid: item.id, ${item.id}`);
        if (!Items[item.id]) throw Error(`Error: does not exist, ${item.id}`);

        Items[item.id] = item;

        Emitter.emit(Event.UPDATED, item);

        return item;
    }

    Remove(id: string): T {
        const { Emitter, Items } = this;

        if (!id) throw Error(`Invalid: missing id`);

        const item = Items[id];

        if (!item) throw Error(`Error: does not exist, ${id}`);
        if (!(delete Items[id])) throw Error(`Error: remove failed, ${id}`);

        Emitter.emit(Event.REMOVED, item);

        return item;
    }

    All(): T[] {
        const { Items } = this;
        
        return Object.values(Items);
    }

    Size(): number {
        return this.All().length;
    }
}
