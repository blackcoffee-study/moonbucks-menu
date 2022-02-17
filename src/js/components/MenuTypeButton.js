export default (target, menuType, menuTypeText) => {
  console.log("동작", menuType, menuTypeText);
  target.insertAdjacentHTML("beforeend", /*html*/
    `<button
      data-category-name="${menuType}"
      class="cafe-category-name btn bg-white shadow mx-1"
  >
    ${menuTypeText}
  </button>`);
};