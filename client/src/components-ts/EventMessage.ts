const EventMessage = () => {
    const div = document.createElement('div');

    div.classList.add('message');

    div.addEventListener('message', (event: CustomEvent<string>) => {
        const { detail } = event;
        div.innerText = detail;
    });

    return div;
};

export default EventMessage;
