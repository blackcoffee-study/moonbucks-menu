function $<T extends HTMLElement = HTMLDivElement>(selector: string) {
  const element = document.querySelector(selector);
  return element as T;
}

class EspressoMenu {
  menuForm: HTMLFormElement;
  menuInput: HTMLInputElement;
  submitBtn: HTMLButtonElement;
  menuList: HTMLUListElement;
  menuItem: HTMLLIElement;
  menuName: HTMLSpanElement;
  menuCount: number;
  menuCountText: HTMLSpanElement;

  constructor() {
    this.menuForm = $<HTMLFormElement>("#espresso-menu-form");
    this.menuInput = $<HTMLInputElement>("#espresso-menu-name");
    this.submitBtn = $<HTMLButtonElement>("#espresso-menu-submit-button");
    this.menuList = $<HTMLUListElement>("#espresso-menu-list");
    this.menuItem = $<HTMLLIElement>(".menu-list-item");
    this.menuName = $<HTMLSpanElement>(".menu-name");
    this.menuCount = 0;
    this.menuCountText = $<HTMLSpanElement>(".menu-count");

    this.bindEventListeners();
  }

  bindEventListeners() {
    this.menuForm.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
    });

    // 메뉴 추가
    this.submitBtn.addEventListener("click", () => {
      this.addNewMenu();
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      const key = e.key || e.keyCode;
      if (key === "Enter" || key === 13) this.addNewMenu();
    });

    // 메뉴 수정 & 삭제
    this.menuList.addEventListener("click", (e: MouseEvent) => {
      if ((e.target as HTMLLIElement).classList.contains("menu-edit-button"))
        this.editMenu(e.target as HTMLLIElement);
      else if (
        (e.target as HTMLLIElement).classList.contains("menu-remove-button")
      )
        this.deleteMenu(e.target as HTMLLIElement);
      else return;
    });
  }

  updateCount(type: "add" | "delete") {
    if (type === "add") this.menuCount += 1;
    else this.menuCount -= 1;
    this.menuCountText.innerText = `총 ${this.menuCount}개`;
  }

  createMenuHTML(name: string) {
    return `
    <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${name}</span>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
    </li>`;
  }

  addNewMenu() {
    const menuName: string = this.menuInput.value;
    if (menuName === "") return;

    this.menuInput.value = "";
    const newMenu = this.createMenuHTML(menuName);
    this.menuList.insertAdjacentHTML("afterbegin", newMenu);

    this.updateCount("add");
  }

  editMenu(menu: HTMLLIElement) {
    const menuNameElement: HTMLSpanElement =
      menu.parentElement.querySelector(".menu-name");
    const editPrompt = prompt("메뉴명을 수정하세요", menuNameElement.innerText);
    if (!editPrompt) return;
    menuNameElement.innerText = editPrompt;
  }

  deleteMenu(menu: HTMLLIElement) {
    const delConfirm = confirm("정말 삭제하시겠습니까?");
    if (!delConfirm) return;
    this.menuList.removeChild(menu.parentNode);

    this.updateCount("delete");
  }
}

new EspressoMenu();
