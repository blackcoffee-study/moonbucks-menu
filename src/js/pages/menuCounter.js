
export default class MenuItemCounter {
    constructor(app) {
        this.$app = app;
        this.state = [];
        this.setState();
    }

    setState(newState) {
        this.state = newState;
    }

    render() {
        this.$app.innerText = `총 ${this.state.length} 개`;
    }
}
