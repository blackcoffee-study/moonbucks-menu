import { $ } from "./share/dom.js";

class CafeMenu {
  menu: {
    espresso: string[];
    frappuccino: string[];
    blended: string[];
    teavana: string[];
    desert: string[];
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
      else return;
    });
  }

  createMenuHTML(name: string) {
    return `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${name}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
      </li>`;
  }

  renderMenus(category: string) {
    this.menuList.innerHTML = "";
    this.menu[category].map((item: string) => {
      this.menuList.insertAdjacentHTML("beforeend", this.createMenuHTML(item));
    });

    this.updateCount(this.menuCount, category);
  }

  updateCount(target: HTMLSpanElement, category: string) {
    target.textContent = `총 ${this.menu[category].length}개`;
  }

  addNewMenu(category: string) {
    const menuName: string = this.menuInput.value;
    if (menuName === "") return;

    this.menu[category].push(menuName);
    this.menuInput.value = "";
  }

  editMenu(menu: HTMLLIElement, category: string) {
    const menuNameElement: HTMLSpanElement =
      menu.parentElement.querySelector(".menu-name");
    const name: string = menuNameElement.textContent;
    const index: number = this.menu[category].indexOf(name);

    const newMenuName = prompt("메뉴명을 수정하세요", name);
    if (!newMenuName) return;

    menuNameElement.innerText = newMenuName;
    this.menu[category].splice(index, 1, newMenuName);
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

    this.updateCount(this.menuCount, category);
  }
}

new CafeMenu();
