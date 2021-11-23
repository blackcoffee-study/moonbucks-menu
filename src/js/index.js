import Menu from "./menu.js";

function App() {
  const espressoMenu = new Menu("espresso");

  document
    .querySelector(".cafe-category-name")
    .parentElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("cafe-category-name")) {
        const categoryName = e.target.getAttribute("data-category-name");
        espressoMenu.setupWithStorageKey(categoryName);
      }
    });
}

App();
