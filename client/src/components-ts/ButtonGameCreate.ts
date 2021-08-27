import GameEventHandler from "../utils/GameEventHandler";

const ButtonGameCreate = () => {
    const button = document.createElement('button');

    button.classList.add('connection');
    button.onclick = () => {
        const now = Date.now();
        GameEventHandler.Instance.CreateGame({
            id: new Date(now).toISOString(),
            title: `Title ${now}`,
            studio: `Studio ${now}`,
            publisher: `Publisher ${now}`
        });
    }

    button.innerText = 'Create Game';

    return button;
};

export default ButtonGameCreate;
