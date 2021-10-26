
export default class MenuCategory {
    constructor(app) {
        this.$app = app;
        this.state = {};
    }

    setState(newState) {
        this.state = newState;
    }

    render() {
        this.$app.innerText = `${this.state.text} 메뉴 관리`;
    }
}
