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

const addMenuName = () => {
    const menuNameInput = $("#espresso-menu-name");

    if (isEmpty($("#espresso-menu-name"))) return;

    $("#espresso-menu-list").insertAdjacentHTML(
        "beforeend",
        createListItem(menuNameInput.value)
    );

    menuNameInput.value = "";
};

const isEventTargetCotains = (eventTaget, className) => {
    if (eventTaget.classList.contains(className)) return true;
    return false;
};

const updateMenuName = (menuEditBtn) => {
    // const menuEditBtn = clickEvent.target;
    const parentEl = menuEditBtn.parentElement;
    const curMenuName = parentEl.querySelector(".menu-name");
    const newMenuName = prompt(
        "새로운 메뉴 이름을 입력하세요.",
        curMenuName.innerHTML
    );

    if (!newMenuName) return;
    curMenuName.innerHTML = newMenuName;
};

const init = () => {
    $("#espresso-menu-form").addEventListener("submit", (e) =>
        e.preventDefault()
    );
    $("#espresso-menu-name").addEventListener("keydown", (e) => {
        if (e.key === "Enter") addMenuName();
    });
    $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (isEventTargetCotains(e.target, "menu-edit-button")) {
            updateMenuName(e.target);
            return;
        }
    });
};

init();
