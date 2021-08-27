import React from "react";
import ConnectionStatus from "../models/ConnectionStatus";
import Game from "../models/Game";
import GameEvent from "../models/GameEvent";
import ButtonConnection from "./ButtonConnection";
import ButtonCreateGame from "./ButtonCreateGame";
import GameEventHandler from "../utils/GameEventHandler";

const OnGameRemove = (socket: WebSocket) => (event: CustomEvent<Game>) => {
    socket.send(JSON.stringify({ type: 'remove', data: event.detail.id }));
};

const OnGameCreate = (socket: WebSocket) => (event: CustomEvent<Game>) => {
    socket.send(JSON.stringify({ type: 'create', data: event.detail }));
};

interface Props {
    url: string;
}

class WebSocketButtons extends React.Component<Props> {
    state = {
        status: ConnectionStatus.DISCONNECTED,
        socket: null as WebSocket,
    };

    constructor(props: Props) {
        super(props);

        // Fix - Callback scope
        this.toggleConnection = this.toggleConnection.bind(this);
    }

    componentWillUnmount() {
        const { socket } = this.state

        if (socket) socket.close();
    }

    render() {
        const { status } = this.state;
        return (
            <div className="buttons">
                <ButtonConnection status={status} action={this.toggleConnection} />
                <ButtonCreateGame />
            </div>
        );
    }

    private toggleConnection() {
        const { socket } = this.state;

        if (!socket) this.openWebSocket();
        else socket.close();
    }

    private openWebSocket() {
        const { url } = this.props;
        const gameEvent = GameEventHandler.Instance;
        const socket = new WebSocket(url);
        const onGameCreate = OnGameCreate(socket);
        const onGameRemove = OnGameRemove(socket);

        socket.onopen = () => {
            this.setState({
                status: ConnectionStatus.CONNECTED,
                socket
            });
            gameEvent.On(GameEvent.CREATE, onGameCreate);
            gameEvent.On(GameEvent.REMOVE, onGameRemove);
            socket.send(JSON.stringify({ type: 'items' }));
        };
        socket.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);

            console.log('OnMessage:', message);

            if (typeof message !== 'object' || !message.type) return;

            switch (message.type) {
                case 'items':
                    gameEvent.GameItems(message.data);
                    break;
                case 'created':
                    gameEvent.GameCreated(message.data);
                    break;
                case 'updated':
                    gameEvent.GameUpdated(message.data);
                    break;
                case 'removed':
                    gameEvent.GameRemoved(message.data);
                    break;
                default:
                    console.warn(`Unknown type: ${message.type}`);
                    break;
            }
        };
        socket.onclose = () => {
            this.setState({
                status: ConnectionStatus.DISCONNECTED,
                socket: null
            });
            gameEvent.Off(GameEvent.CREATE, onGameCreate);
            gameEvent.Off(GameEvent.REMOVE, onGameRemove);
        };
    }
};

export default WebSocketButtons;
