
export default class MenuCount {
    constructor(_app) {
        this._app = _app;
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