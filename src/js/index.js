const $ = (selector) => document.querySelector(selector);
const isEmpty = (input) => {
    if (input.value.length) return false;
    return true;
};

const createListItem = (menuName) => {
    return `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${menuName}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>`;
};

const init = () => {
    $("#espresso-menu-submit-button").addEventListener("click", () => {
        const menuName = $("#espresso-menu-name").value;
        if (!isEmpty($("#espresso-menu-name"))) {
            console.log(menuName);
            $("#espresso-menu-list").insertAdjacentHTML(
                "beforeend",
                createListItem(menuName)
            );
        }
    });
};

init();
