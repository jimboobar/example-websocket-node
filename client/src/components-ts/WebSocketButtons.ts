import Game from "../models/Game";
import GameEvent from "../models/GameEvent";
import ButtonConnection from "./ButtonConnection";
import ButtonGameCreate from "./ButtonGameCreate";
import GameEventHandler from "../utils/GameEventHandler";

const OnRemoveGame = (socket: WebSocket) => (event: CustomEvent<Game>) => {
    socket.send(JSON.stringify({ type: 'remove', data: event.detail.id }));
};

const OnGameCreate = (socket: WebSocket) => (event: CustomEvent<Game>) => {
    socket.send(JSON.stringify({ type: 'create', data: event.detail }));
};

const WebSocketButtons = (url: string) => {
    const div = document.createElement('div');
    const connection = ButtonConnection();
    const createGame = ButtonGameCreate();
    let socket: WebSocket;
    
    connection.innerText = 'Connect';
    connection.onclick = () => toggleConnection();
    createGame.disabled = true;

    div.classList.add('buttons');
    div.append(connection);
    div.append(createGame);

    return div;

    function toggleConnection() {
        if (!socket) openSocket();
        else socket.close();
    }

    function openSocket() {
        const gameEvents = GameEventHandler.Instance;
        connection.disabled = true;
        connection.textContent = 'Connecting...';
        
        socket = new WebSocket(url);
        const onRemoveGame = OnRemoveGame(socket);
        const onGameCreate = OnGameCreate(socket);
        socket.onopen = () => {
            connection.textContent = 'Disconnect';
            connection.disabled = false;
            createGame.disabled = false;

            gameEvents.On(GameEvent.CREATE, onGameCreate);
            gameEvents.On(GameEvent.REMOVE, onRemoveGame);

            socket.send(JSON.stringify({ type: 'items' }));
        };
        socket.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            div.dispatchEvent(new CustomEvent('message', { detail: message }));

            if (typeof message !== 'object' || !message.type) return;

            switch (message.type) {
                case 'items':
                    gameEvents.GameItems(message.data);
                    break;
                case 'created':
                    gameEvents.GameCreated(message.data);
                    break;
                case 'updated':
                    gameEvents.GameUpdated(message.data);
                    break;
                case 'removed':
                    gameEvents.GameRemoved(message.data);
                    break;
                default:
                    console.warn(`Unknown type: ${message.type}`);
                    break;
            }
        };
        socket.onclose = () => {
            createGame.disabled = true;
            connection.textContent = 'Connect';
            connection.disabled = false;
            gameEvents.Off(GameEvent.CREATE, onGameCreate);
            gameEvents.Off(GameEvent.REMOVE, onRemoveGame);
            socket = null;
        };
    }
};

export default WebSocketButtons;
