const $ = (selector) => {
  return document.querySelector(selector);
};

function App() {
  const $menuForm = $("#espresso-menu-form");
  const $menuList = $("#espresso-menu-list");
  const $menuNameInput = $("#espresso-menu-name");
  const $submitButton = $("#espresso-menu-submit-button");
  const $counter = $(".menu-count");
  const $categoryNav = $("#cafe-category-nav");
  const $categoryNames = document.getElementsByClassName("cafe-category-name");
  const $menuTitle = $(".mt-1");

  this.init = () => {
    this.menuItemInfoList = {};
    this.currentCategory = $categoryNames[0].dataset.categoryName;
    const categoryArray = [...$categoryNames].map(
      (item) => item.dataset.categoryName
    );
    categoryArray.map((item) => {
      this.menuItemInfoList[item] = [];
    });
    initCurCategoryMenuItems();
    initEventHandlers();
    render();
  };

  const initCurCategoryMenuItems = () => {
    this.menuItemInfoList[this.currentCategory] = JSON.parse(getLocalStorage())
      ? JSON.parse(getLocalStorage())
      : [];
  };

  const initEventHandlers = () => {
    $menuForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $menuNameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && $menuNameInput.value !== "") addMenuItem();
    });

    $submitButton.addEventListener("click", () => addMenuItem());

    $menuList.addEventListener("click", (e) => {
      if (isContainedClass("menu-edit-button", e)) modifyMenuItem(e);
      else if (isContainedClass("menu-remove-button", e)) removeMenuItem(e);
      else if (isContainedClass("menu-sold-out-button", e)) {
        const $listItem = e.target.closest("li");
        const menuId = $listItem.dataset.id;
        let soldOut = this.menuItemInfoList[this.currentCategory][menuId]
          .soldOut;
        this.menuItemInfoList[this.currentCategory][menuId].soldOut = !soldOut;
        setLocalStorage();
      }
    });

    $categoryNav.addEventListener("click", (e) => {
      if (isContainedClass("cafe-category-name", e)) {
        this.currentCategory = e.target.dataset.categoryName;
        $menuTitle.innerText = `${e.target.innerText} 메뉴 관리`;
        initCurCategoryMenuItems();
        render();
      }
    });
  };

  const getLocalStorage = () => {
    return localStorage.getItem(this.currentCategory);
  };

  const setLocalStorage = () => {
    localStorage.setItem(
      this.currentCategory,
      JSON.stringify(this.menuItemInfoList[this.currentCategory])
    );
    render();
  };

  const render = () => {
    if (this.menuItemInfoList[this.currentCategory]) {
      $menuList.innerHTML = this.menuItemInfoList[this.currentCategory]
        .map((item, index) => template(item, index))
        .join("");
      updateMenuCount();
      initMenuNameInput();
    }
  };

  const template = (item, index) => {
    return `<li data-id="${index}" class="menu-list-item  d-flex items-center py-2">
              <span class="${
                item.soldOut ? "sold-out" : ""
              } w-100 pl-2 menu-name">${item.menuName}</span>
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
  const initMenuNameInput = () => {
    $menuNameInput.value = "";
    $menuNameInput.focus();
  };

  const isContainedClass = (className, e) => {
    if (e.target.classList.contains(className)) return true;
    return false;
  };

  const isReduplicatedMenuName = (newMenuName) => {
    const reduplicatedMenuItem = this.menuItemInfoList[
      this.currentCategory
    ].find((item) => item.menuName === newMenuName);

    if (reduplicatedMenuItem) return true;
    return false;
  };

  const updateMenuCount = () => {
    const menuCount = this.menuItemInfoList[this.currentCategory].length;
    $counter.textContent = `총 ${menuCount} 개`;
  };

  const addMenuItem = () => {
    if (isReduplicatedMenuName($menuNameInput.value)) {
      alert("이미 동일한 메뉴명이 있습니다.");
      initMenuNameInput();
      return;
    }
    if ($menuNameInput.value.trim() === "") {
      alert("메뉴명을 입력해주세요.");
      initMenuNameInput();
      return;
    }
    const menuItemInfo = {
      menuName: $menuNameInput.value,
      category: this.currentCategory,
      soldOut: false,
    };
    this.menuItemInfoList[this.currentCategory].push(menuItemInfo);
    setLocalStorage();
  };

  const modifyMenuItem = (e) => {
    const $listItem = e.target.closest("li");
    const $menuName = $listItem.querySelector(".menu-name");
    const newMenuName = prompt(
      "수정할 메뉴명을 적어주세요.",
      $menuName.textContent
    );

    if (isReduplicatedMenuName(newMenuName)) {
      alert("이미 동일한 메뉴명이 있습니다.");
    } else if (newMenuName === "") {
      alert("메뉴명을 입력해주세요.");
    } else if (newMenuName !== null) {
      this.menuItemInfoList[this.currentCategory][
        $listItem.dataset.id
      ].menuName = newMenuName;
      setLocalStorage();
    }
  };

  const removeMenuItem = (e) => {
    const $listItem = e.target.closest("li");
    if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
      this.menuItemInfoList[this.currentCategory].splice(
        $listItem.dataset.id,
        1
      );
      setLocalStorage();
    }
  };
}

const app = new App();
app.init();
