
export default class MenuCount {
    constructor(_app) {
        this._app = _app;
    }

    render(_item) {
        this._app.innerText = `총 ${_item.length} 개`;
    }
}