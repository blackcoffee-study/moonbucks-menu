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

function AddMenu(e) {
  const { value } = $menuinput;
  if (value === "") return;
  const newMenu = createMenuItem(value);
  $menuList.append(newMenu);
  $menuinput.value = "";
}

$menuform.addEventListener("submit", (e) => {
  e.preventDefault();
  AddMenu();
});
$menuSubmitBtn.addEventListener("click", AddMenu);
