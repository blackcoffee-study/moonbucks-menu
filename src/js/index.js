const $menuform = document.getElementById("espresso-menu-form");
const $menuinput = document.getElementById("espresso-menu-name");
const $menuSubmitBtn = document.getElementById("espresso-menu-submit-button");
const $menuList = document.getElementById("espresso-menu-list");

function createMenuItem(name) {
  const li = document.createElement("li");
  li.className = "menu-list-item d-flex items-center py-2";
  li.innerHTML = ` <span class="w-100 pl-2 menu-name">${name}</span>
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
  </button>`;
  return li;
}

function AddMenu() {
  const { value } = $menuinput;
  if (value === "") return;
  const newMenu = createMenuItem(value);
  $menuList.append(newMenu);
  $menuinput.value = "";
}

function editMenu(li) {
  const $menuName = li.querySelector("span.menu-name");
  const previousMenuName = $menuName.innerText;
  const currentMenuName = window.prompt(
    "메뉴명을 수정하세요",
    previousMenuName
  );
  if (previousMenuName === currentMenuName) return;
  if (["", null].includes(currentMenuName)) return;
  $menuName.innerText = currentMenuName;
}

function removeMenu(li) {
  const confirmation = window.confirm("정말 삭제하시겠습니까?");
  if (!confirmation) return;
  li.remove();
}

function handleListClick(e) {
  const { target } = e;
  if (target.tagName !== "BUTTON") return;
  const { classList } = target;
  const selectedBtn = target;
  const selectedLi = selectedBtn.closest("li");
  if (classList.contains("menu-edit-button")) {
    editMenu(selectedLi);
    return;
  }
  if (classList.contains("menu-remove-button")) {
    removeMenu(selectedLi);
    return;
  }
}

$menuList.addEventListener("click", handleListClick);
$menuform.addEventListener("submit", (e) => {
  e.preventDefault();
  AddMenu();
});
$menuSubmitBtn.addEventListener("click", AddMenu);
