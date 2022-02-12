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

const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").childElementCount;
    $(".menu-count").innerText = `총 ${menuCount}개`;
};

const addMenuName = () => {
    const menuNameInput = $("#espresso-menu-name");

    if (isEmpty($("#espresso-menu-name"))) return;

    $("#espresso-menu-list").insertAdjacentHTML(
        "beforeend",
        createListItem(menuNameInput.value)
    );

    menuNameInput.value = "";
    updateMenuCount();
};

const updateMenuName = (menuEditBtn) => {
    const parentEl = menuEditBtn.parentElement;
    const curMenuName = parentEl.querySelector(".menu-name");
    const newMenuName = prompt(
        "새로운 메뉴 이름을 입력하세요.",
        curMenuName.innerText
    );

    if (!newMenuName) return;
    curMenuName.innerText = newMenuName;
};

const removeMenuName = (menuRemoveBtn) => {
    const curListItem = menuRemoveBtn.parentElement;
    const curMenuName = curListItem.querySelector("span").innerText;
    if (confirm(`선택한 메뉴("${curMenuName}")를 삭제하시겠습니까?`)) {
        $("#espresso-menu-list").removeChild(curListItem);
        updateMenuCount();
    }
};

const initEventListeners = () => {
    $("#espresso-menu-form").addEventListener("submit", (e) =>
        e.preventDefault()
    );
    $("#espresso-menu-name").addEventListener("keydown", (e) => {
        if (e.key === "Enter") addMenuName();
    });
    $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e.target);
            return;
        }

        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e.target);
            return;
        }
    });
};

const init = () => {
    initEventListeners();
};

init();
