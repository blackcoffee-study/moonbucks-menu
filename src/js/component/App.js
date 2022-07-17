import Menu from "./Menu.js";

function App() {
    this.$menu = new Menu();

    this.render = () => {
        this.$menu.render();
    }
}

export default App;