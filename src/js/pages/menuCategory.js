
export default class MenuCategory {
    constructor(app) {
        this._app = app;
        this._state = {};
    }

    setState(newState) {
        this._state = newState;
    }

    render() {
        this._app.innerText = `${this._state.text} 메뉴 관리`;
    }
}
