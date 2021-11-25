import Menu from "./menu.js";
import Storage from "./storage/menuStorage.js";
import { $ } from "./utils.js";

function App() {
  const storages = {
    espresso: new Storage("espresso"),
    frappuccino: new Storage("frappuccino"),
    blended: new Storage("blended"),
    teavana: new Storage("teavana"),
    desert: new Storage("desert"),
  };

  const moonbucksMenu = new Menu(storages["espresso"]);

  $(".cafe-category-name").parentElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("cafe-category-name")) {
      const categoryName = e.target.getAttribute("data-category-name");
      moonbucksMenu.setupWithStorage(storages[categoryName]);
    }
  });
}

App();
