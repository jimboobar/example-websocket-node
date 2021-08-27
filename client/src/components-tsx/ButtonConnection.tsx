import React from "react";
import ConnectionStatus from "../models/ConnectionStatus";

enum ButtonText {
    CONNECT = 'CONNECT',
    DISCONNECT = 'DISCONNECT'
}

const toButtonText = (status: ConnectionStatus) =>
    (status === ConnectionStatus.CONNECTED)
        ? ButtonText.DISCONNECT
        : ButtonText.CONNECT;

const ConnectionButton = (props: {
    status: ConnectionStatus;
    action: () => void;
}) => {
    const { action, status } = props;

    return <button onClick={action} >{toButtonText(status)}</button>;
};

export default ConnectionButton;
