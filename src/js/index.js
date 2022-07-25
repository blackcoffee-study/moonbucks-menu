import useMenu from "./useMenu.js";
import { elementIdMap } from "./utils/constant_utils.js";
import { getById } from "./utils/control_dom_utils.js";
import { renderMenu } from "./utils/ui_rendering_utils.js";

const [setCategoryName, addMenu] = useMenu(renderMenu);

const onSubmit = (e) => {
  e.preventDefault();

  const { espressoMenuNameInput } = elementIdMap;
  const name = getById(espressoMenuNameInput).value;

  if (!name) {
    return;
  }

  addMenu(name);

  const submitForm = e.target;
  submitForm.reset();
};

function bindOnSubmitMenu() {
  const { espressoMenuForm: espressoMenuFormId } = elementIdMap;
  getById(espressoMenuFormId).onsubmit = onSubmit;
}

function bindOnClickMenuCategory() {
  const { menuCategoryButtonWrapper } = elementIdMap;
  const buttons = getById(menuCategoryButtonWrapper).children;
  for (const $button of buttons) {
    const categoryName = $button.getAttribute("data-category-name");

    $button.onclick = (e) => {
      const { menuTitleName, espressoMenuNameInput } = elementIdMap;
      getById(menuTitleName).textContent = e.target.textContent;
      getById(
        espressoMenuNameInput
      ).placeholder = `${e.target.textContent.trim()} 메뉴 이름`;
      setCategoryName(categoryName);
    };
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    bindOnSubmitMenu();
    bindOnClickMenuCategory();
  },
  false
);
