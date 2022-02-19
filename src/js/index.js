const $ = (selector) => document.querySelector(selector);

const menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    dessert: [],
};

const title = {
    espresso: "☕ 에스프레소",
    frappuccino: "🥤 프라푸치노",
    blended: "🍹 블렌디드",
    teavana: "🫖 티바나",
    dessert: "🍰 디저트",
};

let curCategory = "";

const isEmpty = (input) => {
    return Boolean(!input.value.length);
};

const createMenuListItem = (menuName) => {
    return `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${menuName}</span>
    <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  >
    품절
  </button>
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

const clearInputValue = (input) => {
    input.value = "";
};

const updateMenuCount = () => {
    const menuCount = $("#menu-list").childElementCount;
    $(".menu-count").innerText = `총 ${menuCount}개`;
};

const renderMenus = (category) => {
    let menuList = menu[category].reduce(
        (prev, cur) => prev + createMenuListItem(cur),
        ""
    );
    $("#menu-list").innerHTML = menuList;
};

const setLocalStorage = (category, newMenus) => {
    localStorage.setItem(category, JSON.stringify(newMenus));
};

const getLocalStorage = (category) => {
    if (!localStorage.getItem(category)) return;

    let items = JSON.parse(localStorage.getItem(category));
    if (!items.length) return;
    return items;
};

const addMenuName = () => {
    const menuNameInput = $("#menu-name");
    if (isEmpty(menuNameInput)) return;
    const menuName = menuNameInput.value;

    menu[curCategory].push(menuName);
    setLocalStorage(curCategory, menu[curCategory]);
    clearInputValue(menuNameInput);
    renderMenus(curCategory);
    updateMenuCount();
};

const updateMenuName = (menuEditBtn) => {
    const parentEl = menuEditBtn.parentElement;
    const curMenuName = parentEl.querySelector(".menu-name").innerText;
    const newMenuName = prompt("새로운 메뉴 이름을 입력하세요.", curMenuName);

    if (!newMenuName) return;
    console.log(menu[curCategory]);
    menu[curCategory][menu[curCategory].indexOf(curMenuName)] = newMenuName;
    console.log(menu[curCategory]);
    setLocalStorage(curCategory, menu[curCategory]);
    renderMenus(curCategory);
};

const removeMenuName = (menuRemoveBtn) => {
    const curListItem = menuRemoveBtn.parentElement;
    const curMenuName = curListItem.querySelector("span").innerText;
    if (confirm(`선택한 메뉴("${curMenuName}")를 삭제하시겠습니까?`)) {
        menu[curCategory].splice(menu[curCategory].indexOf(curMenuName), 1);

        setLocalStorage(curCategory, menu[curCategory]);
        renderMenus(curCategory);
        updateMenuCount();
    }
};

const initEventListeners = () => {
    $("nav").addEventListener("click", ({ target }) => {
        if (!target.getAttribute("data-category-name")) return;
        curCategory = target.getAttribute("data-category-name");
        // 폼 제목 현재 카테고리에 맞게 변경
        $("#form-title").innerText = `${title[curCategory]} 메뉴 관리`;
        // 리스트 현재 카테고리에 맞게 표시
        renderMenus(curCategory);
    });

    $("#menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
        addMenuName();
    });

    $("#menu-list").addEventListener("click", (e) => {
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
    const categories = [
        "espresso",
        "frappuccino",
        "blended",
        "teavana",
        "dessert",
    ];

    // LocalStroage에서 카테고리에 해당하는 메뉴들 가져오기
    categories.forEach((category) => {
        if (!getLocalStorage(category)) return;
        menu[category] = getLocalStorage(category);
    });
    // 초기화면은 espresso
    curCategory = "espresso";
    if (!getLocalStorage(curCategory)) return;
    renderMenus(curCategory);
    updateMenuCount();
};

init();
