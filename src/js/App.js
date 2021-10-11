import Component from "./cores/Component.js";
import Home from "./pages/Home.js";

export default class App extends Component {
  created() {
    super.created();

    new Home();
  }
}
