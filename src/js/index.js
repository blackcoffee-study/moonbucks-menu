import useMenu from "./useMenu.js";
import { elementIdMap } from "./utils/constant_utils.js";
import { getById } from "./utils/control_dom_utils.js";

const [getState, setState, incrementId, setCategoryName] = useMenu();

const onSubmit = (e) => {
  e.preventDefault();

  const { espressoMenuNameInput } = elementIdMap;
  const name = getById(espressoMenuNameInput).value;

  if (!name) {
    return;
  }

  const submitForm = e.target;

  setState({
    ...getState(),
    [incrementId()]: {
      name,
      isSoldOut: false,
    },
  });

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
