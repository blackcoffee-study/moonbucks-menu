import { getLocalStorage, setLocalStorage } from "./storage.js";

const $ = (selector) => document.querySelector(selector);

// {espresso: [{name: "", soldOut: true},{name:"", soldOut: }], ...}
// 해당 이름을 어떻게 찾을것인지 --> index를 어딘가에 따로 저장 : 어디에? dataset
let menuDataList = [];

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

const isVaildName = (name) => {
    const duplicateNames = menuDataList.filter(
        (menuInfo) => menuInfo["menuName"] === name
    );
    if (!duplicateNames.length) return true;

    alert("이미 등록된 메뉴입니다.");
    return false;
};

const setMenuDataList = (category) => {
    if (!getLocalStorage(category)) return;
    menuDataList = getLocalStorage(category);
};

const createMenuListItem = (curData) => {
    return `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name${
        curData["soldOut"] ? " sold-out" : ""
    }">${curData["menuName"]}</span>
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
    const menuListElements = menuDataList.reduce(
        (prev, cur) => prev + createMenuListItem(cur),
        ""
    );
    $("#menu-list").innerHTML = menuListElements;
    updateMenuCount();
};

const addMenuName = () => {
    const menuNameInput = $("#menu-name");
    if (isEmpty(menuNameInput)) return;
    const menuName = menuNameInput.value;
    if (!isVaildName(menuName)) return;

    menuDataList.push({ menuName, soldOut: false });
    setLocalStorage(curCategory, menuDataList);
    clearInputValue(menuNameInput);
    renderMenus(curCategory);
};

const updateMenuName = (menuEditBtn) => {
    const parentEl = menuEditBtn.parentElement;
    const curMenuName = parentEl.querySelector(".menu-name").innerText;
    const newMenuName = prompt("새로운 메뉴 이름을 입력하세요.", curMenuName);

    if (!newMenuName) return;
    if (!isVaildName(newMenuName)) return;

    const curIdx = menuDataList.findIndex(
        (data) => data["menuName"] === curMenuName
    );
    menuDataList[curIdx]["menuName"] = newMenuName;

    // soldOut처리

    setLocalStorage(curCategory, menuDataList);
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
};

const soldOutMenu = (menuSoldOutBtn) => {
    const curListItem = menuSoldOutBtn.parentElement;
    const curMenuEl = curListItem.querySelector(".menu-name");
    const curMenuName = curMenuEl.innerText;
    if (!isSoldOut(curMenuName)) {
        curMenuEl.classList.add("sold-out");
        soldOut[curCategory].push(curMenuName);
        setLocalStorage("soldOut", soldOut);
        renderMenus(curCategory);
        return;
    }
    if (isSoldOut(curMenuName)) {
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
        setMenuDataList(curCategory);
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
    // 초기화면은 espresso
    curCategory = "espresso";
    setMenuDataList(curCategory);
    renderMenus(curCategory);
};

init();
