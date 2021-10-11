// DOM
const $menuCount = document.querySelector(".menu-count");

const $menuForm = document.querySelector("#espresso-menu-form");
const $menuNameInput = document.querySelector("#espresso-menu-name");

const $menuList = document.querySelector("#espresso-menu-list");

// EVENT
function onAddMenuClick() {
  const $menuListItem = document.createElement("li");
  $menuListItem.classList = "menu-list-item d-flex items-center py-2";
  $menuListItem.innerHTML = `
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
  `;
  $menuList.append($menuListItem);

  $menuNameInput.value = "";
}

$menuForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!$menuNameInput.value) {
    alert("값을 입력하세요.");
  } else {
    onAddMenuClick();
  }
});

$menuList.addEventListener("click", (e) => {
  if (e.target && e.target.innerText == "수정") {
    const result = window.prompt("메뉴명을 수정하세요.");
    e.target.parentNode.firstElementChild.innerText = result;
  }

  if (e.target && e.target.innerText == "삭제") {
    window.confirm("정말 삭제하시겠습니까?") &&
      $menuList.removeChild(e.target.parentNode);
  }
});

const observer = new MutationObserver((mutationsList) => {
  const count = mutationsList[0].target.children.length;
  $menuCount.innerHTML = `총 ${count}개`;
});

observer.observe($menuList, {
  attributes: false,
  childList: true,
  subtree: false,
});
