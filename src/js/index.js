const $ = (selector) => document.querySelector(selector);

const menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    dessert: [],
};

const soldOut = {
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

const isSoldOut = (menuName) => {
    if (soldOut[curCategory].indexOf(menuName) === -1) return false;
    return true;
};

const createMenuListItem = (menuName) => {
    const curItemSoldOut =
        soldOut[curCategory].indexOf(menuName) !== -1 ? true : false;
    return `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name${
        curItemSoldOut ? " sold-out" : ""
    }">${menuName}</span>
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

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
    if (!localStorage.getItem(key)) return;

    let items = JSON.parse(localStorage.getItem(key));
    return items;
};

const isVaildName = (menuName) => {
    const curCategoryMenus = menu[curCategory];
    for (let i = 0; i < curCategoryMenus.length; i++) {
        if (curCategoryMenus[i] === menuName) {
            alert("이미 존재하는 메뉴입니다.");
            return false;
        }
    }
    return true;
};

const addMenuName = () => {
    const menuNameInput = $("#menu-name");
    if (isEmpty(menuNameInput)) return;
    const menuName = menuNameInput.value;
    if (!isVaildName(menuName)) return;

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
    if (!isVaildName(newMenuName)) return;
    menu[curCategory][menu[curCategory].indexOf(curMenuName)] = newMenuName;

    if (isSoldOut(curMenuName)) {
        soldOut[curCategory][soldOut[curCategory].indexOf(curMenuName)] =
            newMenuName;
        setLocalStorage("soldOut", soldOut);
    }
    setLocalStorage(curCategory, menu[curCategory]);
    renderMenus(curCategory);
};

const removeMenuName = (menuRemoveBtn) => {
    const curListItem = menuRemoveBtn.parentElement;
    const curMenuName = curListItem.querySelector(".menu-name").innerText;
    if (!confirm(`선택한 메뉴("${curMenuName}")를 삭제하시겠습니까?`)) return;
    menu[curCategory].splice(menu[curCategory].indexOf(curMenuName), 1);
    if (isSoldOut(curMenuName)) {
        soldOut[curCategory].splice(
            soldOut[curCategory].indexOf(curMenuName),
            1
        );
        setLocalStorage("soldOut", soldOut);
    }

    setLocalStorage(curCategory, menu[curCategory]);
    renderMenus(curCategory);
    updateMenuCount();
};

const soldOutMenu = (menuSoldOutBtn) => {
    const curListItem = menuSoldOutBtn.parentElement;
    const curMenuEl = curListItem.querySelector(".menu-name");
    const curMenuName = curMenuEl.innerText;
    const curItemSoldOut =
        soldOut[curCategory].indexOf(curMenuName) !== -1 ? true : false;
    if (!curItemSoldOut) {
        curMenuEl.classList.add("sold-out");
        soldOut[curCategory].push(curMenuName);
        setLocalStorage("soldOut", soldOut);
        renderMenus(curCategory);
        return;
    }
    if (curItemSoldOut) {
        curMenuEl.classList.remove("sold-out");
        soldOut[curCategory].splice(
            soldOut[curCategory].indexOf(curMenuName),
            1
        );
        setLocalStorage("soldOut", soldOut);
        renderMenus(curCategory);
        return;
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

    $("#menu-list").addEventListener("click", ({ target }) => {
        if (target.classList.contains("menu-edit-button")) {
            updateMenuName(target);
            return;
        }

        if (target.classList.contains("menu-remove-button")) {
            removeMenuName(target);
            return;
        }

        if (target.classList.contains("menu-sold-out-button")) {
            soldOutMenu(target);
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

    categories.forEach((category) => {
        // LocalStroage에서 카테고리에 해당하는 메뉴들 가져오기
        if (getLocalStorage(category))
            menu[category] = getLocalStorage(category);
    });
    // 초기화면은 espresso
    curCategory = "espresso";

    // LocalStorage에서 soldOut 정보 가져오기
    if (getLocalStorage("soldOut")) {
        const soldOutInfo = getLocalStorage("soldOut");
        categories.forEach((category) => {
            soldOut[category] = soldOutInfo[category]
                ? soldOutInfo[category]
                : [];
        });
    }

    renderMenus(curCategory);
    updateMenuCount();
};

init();
