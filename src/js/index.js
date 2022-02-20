import { getLocalStorage, setLocalStorage } from "./storage.js";

const $ = (selector) => document.querySelector(selector);

// 현재 카테고리의 데이터만 저장, {menuName:"메뉴이름", soldOut: 품절여부(Boolean)} 형식으로 요소 저장
let menuDatas = [];

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

const isVaildName = (name) => {
    const duplicateNames = menuDatas.filter(
        (menuData) => menuData["menuName"] === name
    );
    if (!duplicateNames.length) return true;

    alert("이미 등록된 메뉴입니다.");
    return false;
};

const clearInputValue = (input) => {
    input.value = "";
};

const findCurMenuIdx = (menuName) => {
    return menuDatas.findIndex((menuData) => menuData["menuName"] === menuName);
};

// menuDatas에 localStorage에서 가져온 데이터를 저장
const setMenuDatas = (category) => {
    if (getLocalStorage(category)) {
        menuDatas = getLocalStorage(category);
        return;
    }
    menuDatas = [];
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

const updateMenuCount = () => {
    const menuCount = $("#menu-list").childElementCount;
    $(".menu-count").innerText = `총 ${menuCount}개`;
};

const renderMenus = () => {
    const menuListElements = menuDatas.reduce(
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

    menuDatas.push({ menuName, soldOut: false });
    setLocalStorage(curCategory, menuDatas);
    clearInputValue(menuNameInput);
    renderMenus();
};

const updateMenuName = (menuEditBtn) => {
    const parentEl = menuEditBtn.parentElement;
    const curMenuName = parentEl.querySelector(".menu-name").innerText;
    const newMenuName = prompt("새로운 메뉴 이름을 입력하세요.", curMenuName);

    if (!newMenuName) return;
    if (!isVaildName(newMenuName)) return;

    const curIdx = findCurMenuIdx(curMenuName);
    menuDatas[curIdx]["menuName"] = newMenuName;

    setLocalStorage(curCategory, menuDatas);
    renderMenus();
};

const removeMenuName = (menuRemoveBtn) => {
    const curListItem = menuRemoveBtn.parentElement;
    const curMenuName = curListItem.querySelector(".menu-name").innerText;
    if (!confirm(`선택한 메뉴("${curMenuName}")를 삭제하시겠습니까?`)) return;

    menuDatas.splice(findCurMenuIdx(curMenuName), 1);

    setLocalStorage(curCategory, menuDatas);
    renderMenus();
};

const soldOutMenu = (menuSoldOutBtn) => {
    const curListItem = menuSoldOutBtn.parentElement;
    const curMenuEl = curListItem.querySelector(".menu-name");
    const curMenuName = curMenuEl.innerText;
    const curIdx = findCurMenuIdx(curMenuName);
    menuDatas[curIdx]["soldOut"] = !menuDatas[curIdx]["soldOut"];

    setLocalStorage(curCategory, menuDatas);
    renderMenus();
};

const initEventListeners = () => {
    $("nav").addEventListener("click", ({ target }) => {
        if (!target.getAttribute("data-category-name")) return;
        curCategory = target.getAttribute("data-category-name");
        // 폼 제목 현재 카테고리에 맞게 변경
        $("#form-title").innerText = `${title[curCategory]} 메뉴 관리`;
        // 리스트 현재 카테고리에 맞게 표시
        setMenuDatas(curCategory);
        renderMenus();
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

    // 초기 화면 : 에스프레소메뉴
    curCategory = "espresso";
    setMenuDatas(curCategory);
    renderMenus();
};

init();
