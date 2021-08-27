import * as WebSocket from 'ws';
import { Store, StoreItem } from './Store';

const Broadcast = (wss: WebSocket.Server, type: string, data: any) => {
    const message = JSON.stringify({ type, data });
    console.log(`Broadcasting: ${message}`);
    wss.clients.forEach((socket: WebSocket) => {
        if (socket.readyState !== WebSocket.OPEN) return;
        else socket.emit('send', message);
    });
};

const SendMessage = (socket: WebSocket) => (message: string) => {
    console.log(`Sending message: ${message}`);
    socket.send(message);
    console.log(`Message sent!`);
};

const SendItems = (socket: WebSocket, store: Store<any>) => () => {
    const message = JSON.stringify({ type: 'items', data: store.All() });
    socket.emit('send', message);
};

const CreateItem = (socket: WebSocket, store: Store<any>) => (item: any) => {
    try {
        console.log(`Creating item: ${item}`);
        store.Create(item);
        console.log(`Item created: ${item}`);
    } catch (e) {
        socket.emit('error', e);
    }
};

const UpdateItem = (socket: WebSocket, store: Store<any>) => (item: any) => {
    try {
        console.log(`Updating item: ${item}`);
        store.Update(item);
        console.log(`Item updated: ${item}`);
    } catch (e) {
        socket.emit('error', e);
    }
};

const RemoveItem = (socket: WebSocket, store: Store<any>) => (id: string) => {
    try {
        console.log(`Removing item: ${id}`);
        store.Remove(id);
        console.log(`Item removed: ${id}`);
    } catch (e) {
        socket.emit('error', e);
    }
};

const OnMessage = (socket: WebSocket) => (event: WebSocket.MessageEvent) => {
    console.log(`Message: ${event.type} and ${event.data}`);

    const data = event.data.toString();
    const message = JSON.parse(data);

    if (typeof message !== 'object' || !message.type) {
        socket.emit('error', data);
        return;
    }

    switch (message.type) {
        case 'items':
            console.log(`Emitting ${message.type}: ${data}`);
            socket.emit(message.type);
            break;
        case 'create':
        case 'update':
        case 'remove':
            console.log(`Emitting ${message.type}: ${data}`);
            socket.emit(message.type, message.data);
            break;
        default:
            socket.emit('error', data);
            break;
    }
};

const ConnectToStore =
    <T extends StoreItem>(store: Store<T>) =>
    (socket: WebSocket) => {
        console.log('Client connected!');
        socket.onopen = () => console.log('Client connection established!');
        socket.on('items', SendItems(socket, store));
        socket.on('create', CreateItem(socket, store));
        socket.on('send', SendMessage(socket));
        socket.on('update', UpdateItem(socket, store));
        socket.on('remove', RemoveItem(socket, store));
        socket.onmessage = OnMessage(socket);
        socket.onclose = () => console.log('Connection closed!');
        socket.onerror = (event: WebSocket.ErrorEvent) => {
            console.log(`Error: ${JSON.stringify(event)}`);
        };
    };

const WebSocketForStore = <T extends StoreItem>(wsOptions: WebSocket.ServerOptions, store: Store<T>) => {
    const wss = new WebSocket.Server(wsOptions);

    wss.on('connection', ConnectToStore<T>(store));

    store.Emitter.on(Store.Event.CREATED, (item: T) => Broadcast(wss, Store.Event.CREATED, item));
    store.Emitter.on(Store.Event.UPDATED, (item: T) => Broadcast(wss, Store.Event.UPDATED, item));
    store.Emitter.on(Store.Event.REMOVED, (item: T) => Broadcast(wss, Store.Event.REMOVED, item));

    return wss;
};

export default WebSocketForStore;
