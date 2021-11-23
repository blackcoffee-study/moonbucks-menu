import Menu from "./menu.js";

function App() {
  const expressoMenu = new Menu("espresso");

  document
    .querySelector(".cafe-category-name")
    .parentElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("cafe-category-name")) {
        console.log(e.target.getAttribute("data-category-name"));
      }
    });
}

App();
