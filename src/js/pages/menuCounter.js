
export default class MenuItemCounter {
    constructor(app) {
        this._app = app;
        this._state = [];
        this.setState();
    }

    setState(newState) {
        this._state = newState;
    }

    render() {
        this._app.innerText = `총 ${this._state.length} 개`;
    }
}
