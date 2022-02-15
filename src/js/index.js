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
  let newMenuItems = [];

  // Event Handlers
  $menuForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $menuNameInput.addEventListener("keypress", (e) => {
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

  // Functions
  function addMenuItem() {
    const $menuItemTemplate = `<li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${$menuNameInput.value}</span>
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

    const menuItemInfo = {
      menuName: $menuNameInput.value, // data-category-name
      category: {},
      status: "normal", // || sold-out
    };
    newMenuItems.push(menuItemInfo);
    localStorage.setItem("menu", JSON.stringify(newMenuItems));
    $menuList.insertAdjacentHTML("beforeend", $menuItemTemplate);
    $menuNameInput.value = "";

    updateMenuCount();
    $menuNameInput.focus(); // auto focusing
  }

  function modifyMenuItem(e) {
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
      $menuName.textContent = newMenuName;
    }
  }

  function removeMenuItem(e) {
    const $listItem = e.target.closest("li");
    if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
      $menuList.removeChild($listItem);
      updateMenuCount();
    }
  }

  function updateMenuCount() {
    const menuCount = $menuList.querySelectorAll("li").length;
    $counter.textContent = `총 ${menuCount} 개`;
  }

  function isContainedClass(className, e) {
    if (e.target.classList.contains(className)) return true;
    else return false;
  }
}

App();
