import MenuApp from "./MenuApp";
import { store } from "./MenuStore";

store.Init().then(() => new MenuApp(document.querySelector("#app"), {}));
