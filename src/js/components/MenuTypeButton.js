export default ($target, menuType, menuTypeText) => {
  const render = () => {
    $target.insertAdjacentHTML("beforeend", /*html*/`
      <button
        data-category-name="${menuType}"
        class="cafe-category-name btn bg-white shadow mx-1"
      >
        ${menuTypeText}
      </button>
    `);
  }

  const init = () => {
    render();
  }

  init();
};
