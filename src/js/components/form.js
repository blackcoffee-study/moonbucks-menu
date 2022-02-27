import { getId } from "../../utils/getId.js";

export default ($targetEl, state, events) => {
  const { selectedCategoryId, categories } = state;
  const { addMenu } = events;
  const $newForm = $targetEl.cloneNode(true);

  const selectedCategory = categories.find((category) => category.id === selectedCategoryId);

  $newForm.querySelector(".input-field").placeholder = selectedCategory.inputText;

  $newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target.querySelector(".input-field");
    addMenu({ id: getId(), category: selectedCategoryId, name: target.value, isSoldout: false });
    target.value = "";
  });

  return $newForm;
};
