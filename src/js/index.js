const $ = (selector) => {
  return document.querySelector(selector);
};

function App() {
  // init Variables
  const $menuForm = $("#espresso-menu-form");
  const $menuList = $("#espresso-menu-list");
  const $menuNameInput = $("#espresso-menu-name");
  const $submitButton = $("#espresso-menu-submit-button");
  const $counter = $(".menu-count");
  const $categoryNav = $("#cafe-category-nav");

  this.init = () => {
    this.currentCategory = $(".cafe-category-name").getAttribute(
      "data-category-name"
    ); // first category
    this.menuItems = JSON.parse(localStorage.getItem(this.currentCategory));
    if (!this.menuItems) this.menuItems = [];

    initEventHandlers();
    render();
  };

  const setState = (menuItems) => {
    if (this.menuItems !== menuItems) {
      this.menuItems = menuItems;
    }
    render();
  };

  const render = () => {
    if (this.menuItems) {
      $menuList.innerHTML = this.menuItems
        .map((item, index) => {
          return `<li data-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${item.menuName}</span>
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
        })
        .join("");
      updateMenuCount();
      $menuNameInput.focus(); // auto focusing
    }
  };

  // Functions
  const addMenuItem = () => {
    const menuItemInfo = {
      menuName: $menuNameInput.value,
      category: this.currentCategory,
      status: "normal", // || sold-out
    };
    this.menuItems.push(menuItemInfo);
    setState(this.menuItems);
    localStorage.setItem(this.currentCategory, JSON.stringify(this.menuItems));
    $menuNameInput.value = "";
  };

  const modifyMenuItem = (e) => {
    const $listItem = e.target.closest("li");
    const $menuName = $listItem.querySelector(".menu-name");
    const newMenuName = prompt(
      "수정할 메뉴명을 적어주세요.",
      $menuName.textContent
    );

    if (newMenuName === $menuName.textContent) {
      alert("기존과 동일한 메뉴명입니다.");
    } else if (newMenuName === "") {
      alert("값을 입력해주세요.");
    } else if (newMenuName !== null) {
      this.menuItems[$listItem.dataset.id].menuName = newMenuName;
      setState(this.menuItems);
      localStorage.setItem(
        this.currentCategory,
        JSON.stringify(this.menuItems)
      );
    }
  };

  const removeMenuItem = (e) => {
    const $listItem = e.target.closest("li");
    if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
      this.menuItems.splice($listItem.dataset.id, 1);
      localStorage.setItem(
        this.currentCategory,
        JSON.stringify(this.menuItems)
      );
      setState(this.menuItems);
    }
  };

  const updateMenuCount = () => {
    const menuCount = $menuList.querySelectorAll("li").length;
    $counter.textContent = `총 ${menuCount} 개`;
  };

  const isContainedClass = (className, e) => {
    if (e.target.classList.contains(className)) return true;
    else return false;
  };

  const initEventHandlers = () => {
    $menuForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $menuNameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && $menuNameInput.value !== "") addMenuItem();
    });

    $submitButton.addEventListener("click", () => {
      if ($menuNameInput.value === "") alert("값을 입력해주세요.");
      else addMenuItem();
    });

    $menuList.addEventListener("click", (e) => {
      if (isContainedClass("menu-edit-button", e)) modifyMenuItem(e);
      else if (isContainedClass("menu-remove-button", e)) removeMenuItem(e);
    });

    $categoryNav.addEventListener("click", (e) => {
      if (isContainedClass("cafe-category-name", e)) {
        this.currentCategory = e.target.dataset.categoryName;
        if (this.menuItems) {
          this.menuItems = JSON.parse(
            localStorage.getItem(this.currentCategory)
          );
          if (!this.menuItems) this.menuItems = [];

          setState(this.menuItems);
        }
      }
    });
  };
}

const app = new App();
app.init();
