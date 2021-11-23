import { $ } from "./utils/index.js";

const espressoMenuName = $("#espresso-menu-name");
const espressoMenuForm = $("#espresso-menu-form");
const espressoMenuSubmitButton= $("#espresso-menu-submit-button");

const menuNameSubmit = () => {
  espressoMenuForm.addEventListener("submit", (e) => { e.preventDefault() });
  espressoMenuName.addEventListener("keydown",(e)=>{if(e.key === "Enter") { addNewMenu() } });
  espressoMenuSubmitButton.addEventListener("click", addNewMenu)
}

const addNewMenu = () => {
  const menuName = espressoMenuName.value;
}

menuNameSubmit()