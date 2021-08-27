import GameItems from "./GameItems";
import WebSocketButtons from "./WebSocketButtons";

const App = (config: {
    webSocketUrl: string,
    root: HTMLElement
}) => {
    const { webSocketUrl, root } = config;

    root.append(WebSocketButtons(webSocketUrl));
    root.append(GameItems());
};

export default App;
