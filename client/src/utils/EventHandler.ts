export default class EventHandler {
    constructor(private target: EventTarget) { }

    On(event: string, action: (event: CustomEvent) => void) {
        this.target.addEventListener(event, action);
    }

    Off(event: string, action: (event: CustomEvent) => void) {
        this.target.removeEventListener(event, action);
    }

    Emit(event: string, data?: any) {
        this.target.dispatchEvent(new CustomEvent(event, { detail: data }));
    }
}
