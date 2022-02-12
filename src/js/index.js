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
        const menuNameInput = $("#espresso-menu-name");

        if (isEmpty($("#espresso-menu-name"))) return;

        $("#espresso-menu-list").insertAdjacentHTML(
            "beforeend",
            createListItem(menuNameInput.value)
        );

        menuNameInput.value = "";

        $(".menu-edit-button").addEventListener("click", (e) => {
            const parentEl = e.target.parentElement;
            const curMenuName = parentEl.querySelector(".menu-name");
            const newMenuName = prompt("새로운 메뉴 이름을 입력하세요.");

            if (newMenuName) curMenuName.innerHTML = newMenuName;
        });
    });
};

init();
