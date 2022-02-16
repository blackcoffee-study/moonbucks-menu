import { isEmpty } from "./utils/validate.js";

const $espressoMenuForm = document.getElementById("espresso-menu-form");
const $espressoMenuName = document.getElementById("espresso-menu-name");
const $espressoMenuSubmitButton = document.getElementById(
  "espresso-menu-submit-button"
);
const $espressoMenuList = document.getElementById("espresso-menu-list");
const $menuCount = document.querySelector(".menu-count");

$espressoMenuList.addEventListener("click", updateMenuItem);

let espressoMenus = [];

const EDIT_INPUT = "메뉴명을 수정하세요.";
const DELETE_CHECK = "정말 삭제하시겠습니까?";

function addEspressoMenu(newEspresso) {
  const menuTemplate = `<li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${newEspresso.menu}</span>
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

  $espressoMenuList.innerHTML += menuTemplate;
  getMenuCount();
}

function handleToSubmitMenu() {
  const newEspressoMenu = $espressoMenuName.value.trim();
  $espressoMenuName.value = "";
  if (isEmpty(newEspressoMenu)) {
    const newEspressoObj = {
      menu: newEspressoMenu,
      id: Date.now(),
    };
    espressoMenus.push(newEspressoObj);
    addEspressoMenu(newEspressoObj);
  }
}

function handleToSubmitWithEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    handleToSubmitMenu();
  }
}

$espressoMenuForm.addEventListener("submit", (event) => event.preventDefault());
$espressoMenuName.addEventListener("keyup", handleToSubmitWithEnter);
$espressoMenuSubmitButton.addEventListener("click", handleToSubmitMenu);

function updateMenuItem({ target }) {
  const { classList } = target;
  if (classList.contains("menu-edit-button")) editMenuName(target);
  if (classList.contains("menu-remove-button")) deleteMenu(target);
}

function editMenuName(target) {
  const li = target.parentElement;
  const span = li.querySelector(".menu-name");
  let newMenuName = prompt(EDIT_INPUT, span.textContent);
  if (newMenuName) {
    newMenuName = newMenuName.trim();
    if (isEmpty(newMenuName)) {
      espressoMenus.forEach((espressoMenu) => {
        if (espressoMenu.id == parseInt(li.id)) {
          espressoMenu.menu = newMenuName;
          span.textContent = newMenuName;
          console.log(newMenuName, newMenuName.length);
        }
      });
    }
  }
}

function deleteMenu(target) {
  const answer = confirm(DELETE_CHECK);
  if (answer) {
    const li = target.parentElement;
    espressoMenus = espressoMenus.filter(
      (espresso) => espresso.id !== parseInt(li.id)
    );
    li.remove();
    getMenuCount();
  }
}

function getMenuCount() {
  $menuCount.textContent = `총 ${espressoMenus.length}개`;
}

// trim polyfill
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}
