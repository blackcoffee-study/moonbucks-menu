import Component from "./cores/Component.js";
import Home from "./pages/Home.js";

export default class App extends Component {
  created() {
    super.created();

    const home = new Home(this.targetElement, null);

    this.childrenComponents = [home];
  }

  updated() {
    super.updated();

    const home = new Home(this.targetElement, null);

    this.childrenComponents = [home];
  }
}
