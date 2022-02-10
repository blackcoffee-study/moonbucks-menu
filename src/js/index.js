const espressoMenuForm = document.getElementById("espresso-menu-form");
const espressoMenuName = document.getElementById("espresso-menu-name");
const espressoMenuSubmitButton = document.getElementById(
  "espresso-menu-submit-button"
);
const espressoMenuList = document.getElementById("espresso-menu-list");

let espressoMenus = [];

function addEspressoMenu() {}

function handleToSubmitMenu(event) {
  event.preventDefault();
  const newEspressoMenu = espressoMenuName.value;
  espressoMenuName.value = "";
  const newEspressoObj = {
    menu: newEspressoMenu,
    id: Date.now(),
  };
  espressoMenus.push(newEspressoObj);
  console.log(newEspressoObj);
}

espressoMenuForm.addEventListener("submit", handleToSubmitMenu);
espressoMenuSubmitButton.addEventListener("click", handleToSubmitMenu);
