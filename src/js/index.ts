import { $ } from "./share/dom.js";
import { getLocalStorage, setLocalStroage } from "./share/localStorage.js";

interface Imenu {
  name: string;
  soldOut: boolean;
}

class CafeMenu {
  menu: {
    espresso: Imenu[];
    frappuccino: Imenu[];
    blended: Imenu[];
    teavana: Imenu[];
    desert: Imenu[];
  };

  nav: HTMLElement;
  menuForm: HTMLFormElement;
  menuTitle: HTMLHeadElement;
  menuInput: HTMLInputElement;
  submitBtn: HTMLButtonElement;
  menuList: HTMLUListElement;
  menuItem: HTMLLIElement;
  menuName: HTMLSpanElement;
  menuCount: HTMLSpanElement;
  currentCategory: string;
  LS_MENU: Array<string>;

  constructor() {
    this.menu = {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      desert: [],
    };

    this.nav = $<HTMLElement>("nav");
    this.menuForm = $<HTMLFormElement>("#menu-form");
    this.menuTitle = $<HTMLHeadElement>("#category-title");
    this.menuInput = $<HTMLInputElement>("#menu-name");
    this.submitBtn = $<HTMLButtonElement>("#menu-submit-button");
    this.menuList = $<HTMLUListElement>("#menu-list");
    this.menuItem = $<HTMLLIElement>(".menu-list-item");
    this.menuName = $<HTMLSpanElement>(".menu-name");
    this.menuCount = $<HTMLSpanElement>(".menu-count");
    this.currentCategory = "espresso";

    this.initApp();
  }

  initApp() {
    const LS_MENU = getLocalStorage("menu");
    if (LS_MENU === null) setLocalStroage("menu", this.menu);

    this.renderMenus(this.currentCategory);
    this.bindEventListeners();
  }

  bindEventListeners() {
    // 메뉴 선택
    this.nav.addEventListener("click", (e: MouseEvent) => {
      if (!(e.target as HTMLLIElement).classList.contains("cafe-category-name"))
        return;

      this.currentCategory = (e.target as HTMLLIElement).dataset.categoryName;

      this.menuTitle.textContent = `${
        (e.target as HTMLLIElement).textContent
      } 메뉴 관리`;

      this.menuList.dataset.categoryName = this.currentCategory;

      this.renderMenus(this.currentCategory);
    });

    this.menuForm.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
    });

    // 메뉴 추가
    this.submitBtn.addEventListener("click", () => {
      this.addNewMenu(this.currentCategory);

      if (this.menuList.dataset.categoryName === this.currentCategory)
        this.renderMenus(this.currentCategory);
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      const key = e.key || e.keyCode;
      if (key !== "Enter" && key !== 13) return;

      this.addNewMenu(this.currentCategory);

      if (this.menuList.dataset.categoryName === this.currentCategory)
        this.renderMenus(this.currentCategory);
    });

    // 메뉴 수정 & 삭제
    this.menuList.addEventListener("click", (e: MouseEvent) => {
      if ((e.target as HTMLLIElement).classList.contains("menu-edit-button"))
        this.editMenu(e.target as HTMLLIElement, this.currentCategory);
      else if (
        (e.target as HTMLLIElement).classList.contains("menu-remove-button")
      )
        this.deleteMenu(e.target as HTMLLIElement, this.currentCategory);
      else if (
        (e.target as HTMLLIElement).classList.contains("menu-sold-out-button")
      )
        this.soldOutMenu(e.target as HTMLLIElement, this.currentCategory);
      else return;
    });
  }

  createMenuHTML(name: string, soldOut: boolean) {
    const soldOutClass = soldOut ? "sold-out" : "";

    return `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${soldOutClass}">${name}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">품절</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
      </li>`;
  }

  renderMenus(category: string) {
    const LS_MENU = getLocalStorage("menu");
    if (LS_MENU === null) return;
    this.menu = LS_MENU;

    this.menuList.innerHTML = "";
    LS_MENU[category].map((item: Imenu) => {
      this.menuList.insertAdjacentHTML(
        "beforeend",
        this.createMenuHTML(item.name, item.soldOut)
      );
    });

    this.updateCount(this.menuCount, category);
  }

  updateCount(target: HTMLSpanElement, category: string) {
    const LS_MENU = getLocalStorage("menu");
    target.textContent = `총 ${LS_MENU[category].length}개`;
  }

  addNewMenu(category: string) {
    const menuName: string = this.menuInput.value;
    if (menuName === "") return;

    this.menu[category].push({ name: menuName, soldOut: false });
    setLocalStroage("menu", this.menu);
    this.menuInput.value = "";
  }

  editMenu(menu: HTMLLIElement, category: string) {
    const menuNameElement: HTMLSpanElement =
      menu.parentElement.querySelector(".menu-name");
    const name: string = menuNameElement.textContent;
    let index = 0;
    this.menu[category].forEach((menu, idx) => {
      if (menu.name === name) index = idx;
    });

    const newMenuName = prompt("메뉴명을 수정하세요", name);
    if (!newMenuName) return;

    menuNameElement.innerText = newMenuName;
    this.menu[category].splice(index, 1, {
      name: newMenuName,
      soldOut: this.menu[category][index].soldOut,
    });
    setLocalStroage("menu", this.menu);
  }

  deleteMenu(menu: HTMLLIElement, category: string) {
    const menuNameElement: HTMLSpanElement =
      menu.parentElement.querySelector(".menu-name");
    const name: string = menuNameElement.textContent;
    const index: number = this.menu[category].indexOf(name);

    const delConfirm = confirm("정말 삭제하시겠습니까?");
    if (!delConfirm) return;

    this.menuList.removeChild(menu.parentNode);
    this.menu[category].splice(index, 1);
    setLocalStroage("menu", this.menu);

    this.updateCount(this.menuCount, category);
  }

  soldOutMenu(menu: HTMLLIElement, category: string) {
    const menuNameElement: HTMLSpanElement =
      menu.parentElement.querySelector(".menu-name");
    const name: string = menuNameElement.textContent;
    let index = 0;
    this.menu[category].forEach((menu, idx) => {
      if (menu.name === name) index = idx;
    });

    this.menu[category].splice(index, 1, {
      name,
      soldOut: !this.menu[category][index].soldOut,
    });
    setLocalStroage("menu", this.menu);

    if (menuNameElement.classList.contains("sold-out"))
      menuNameElement.classList.remove("sold-out");
    else menuNameElement.classList.add("sold-out");
  }
}

new CafeMenu();
