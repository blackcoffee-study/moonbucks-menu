const getTemplate = ({ name, id }) => ` 
 <button id=${id} data-category-name="teavana" class="cafe-category-name btn bg-white shadow mx-1">${name}</button>    
`;

const createNewMenu = (category, index) => {
  const $newMenu = document.createElement("frame");
  $newMenu.innerHTML = getTemplate(category);

  return $newMenu.firstElementChild;
};

export default ($targetEl, state, events) => {
  const { categories } = state;
  const { selectCategory } = events;
  const $newCategories = $targetEl.cloneNode(true);

  $newCategories.innerHTML = "";

  $newCategories.addEventListener("click", (e) => {
    selectCategory(e.target.id);
  });

  categories.map((category) => createNewMenu(category)).map(($el) => $newCategories.appendChild($el));

  return $newCategories;
};
