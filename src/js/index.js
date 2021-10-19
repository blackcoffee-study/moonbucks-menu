import { $ } from "./util/helper.js";

const $menuCount = $(".menu-count");

const $menuForm = $("#menu-form");
const $menuNameInput = $("#menu-name");

const $menuList = $("#menu-list");

const $nav = $("nav");
const $categoryTitle = $("#category-title");

const store = {
  setLocalStorage(value) {
    localStorage.setItem("menu", JSON.stringify(value));
  },

  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

// 1. localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
// 2. 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
// 3. 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
// 4. 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
//    품절일경우: <span class="w-100 pl-2 menu-name sold-out">${name}</span>

function App() {
  //this.menu = [];
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = "espresso";
  this.soldout = false;

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((item, index) => {
        return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">
            ${item.name}
          </span>
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
        </li>
      `;
      })
      .join("");

    $menuList.innerHTML = template;
    countMenu();
  };

  const addMenu = () => {
    if (!$menuNameInput.value) {
      alert("값을 입력하세요.");
      return;
    }

    this.menu[this.currentCategory].push({ name: $menuNameInput.value });
    store.setLocalStorage(this.menu);
    render();
    $menuNameInput.value = "";
  };

  const editMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const result = window.prompt("메뉴명을 수정하세요.");
    this.menu[this.currentCategory][menuId].name = result;
    store.setLocalStorage(this.menu);
    e.target.parentNode.firstElementChild.innerText = result;
  };

  const deleteMenu = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.parentNode.dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      $menuList.removeChild(e.target.parentNode);

      countMenu();
    }
  };

  const countMenu = () => {
    const count = $menuList.childElementCount;
    $menuCount.innerHTML = `총 ${count}개`;
  };

  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.soldout = !this.soldout;

    if (this.soldout) {
      e.target.parentNode.firstElementChild.classList.add("sold-out");
    }

    console.log(this.soldout);
  };

  $menuForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addMenu();
  });

  $menuList.addEventListener("click", (e) => {
    if (e.target && e.target.innerText == "품절") {
      soldOutMenu(e);
      return;
    }

    if (e.target && e.target.innerText == "수정") {
      editMenu(e);
      return;
    }

    if (e.target && e.target.innerText == "삭제") {
      deleteMenu(e);
      return;
    }
  });

  $nav.addEventListener("click", (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $categoryTitle.innerText = `${e.target.innerText} 메뉴 관리`;
    }
    render();
  });
}

const app = new App();
app.init();
