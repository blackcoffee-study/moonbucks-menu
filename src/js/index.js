const $btnMoonbucksMenu = document.querySelector('#app nav');
const $menuName = document.querySelector('main h2');
const $menuCount = document.querySelector('.menu-count');
const $menuForm = document.querySelector('#menu-form');
const $menuInput = $menuForm.querySelector('input');
const $btnSubmitMenu = $menuForm.querySelector('button');
const $menuList = document.querySelector('#menu-list');

let menuList = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  dessert: []
};

let menuCategoryName = 'espresso';
let menuName;

const menuCounter = function () {
  $menuCount.innerText = `총 ${menuList[menuCategoryName].length}개`;
};

const setMenu = function (menu) {
  localStorage.setItem('menu', JSON.stringify(menu));
};

const editMenu = function (event) {
  const li = event.target.parentElement;
  const menuId = parseInt(li.id);
  const menuName = li.children[0];
  const editMenuValue = prompt('메뉴명을 수정하세요.', menuName.innerText);
  if (!editMenuValue) return;

  menuList[menuCategoryName].forEach(menu => {
    if (menu.id === menuId) menu.name = editMenuValue;
  });
  setMenu(menuList);
  menuName.innerText = editMenuValue;
};

const removeMenu = function (event) {
  const li = event.target.parentElement;
  const menuId = parseInt(li.id);
  const removeConfirm = confirm('정말 삭제하시겠습니까?');
  if (!removeConfirm) return;

  li.remove();
  menuList[menuCategoryName] = menuList[menuCategoryName].filter(
    menu => menu.id !== menuId
  );
  menuCounter();
  setMenu(menuList);
};

const soldOutMenu = function (event) {
  const li = event.target.parentElement;
  const menuId = parseInt(li.id);
  const menuName = li.children[0];

  menuList[menuCategoryName].forEach(menu => {
    if (menu.id === menuId) {
      menuName.classList.toggle('sold-out');
      [...menuName.classList].includes('sold-out')
        ? (menu.soldOut = true)
        : (menu.soldOut = false);
    }
  });
  setMenu(menuList);
};

const renderMenu = function (menu) {
  const templete = menu
    .map(
      item => `
      <li class="menu-list-item d-flex items-center py-2" id=${item.id}>
          <span class="w-100 pl-2 menu-name">${item.name}</span>
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
    `
    )
    .join('');
  $menuList.innerHTML = templete;
  menu.forEach(item => handleButtons(item.id));
  menuCounter();
};

const handleButtons = function (id) {
  const $menuItem = document.getElementById(`${id}`);
  const $btnEdit = $menuItem.querySelector('.menu-edit-button');
  const $btnRemove = $menuItem.querySelector('.menu-remove-button');
  const $btnSoldout = $menuItem.querySelector('.menu-sold-out-button');

  $btnEdit.addEventListener('click', editMenu);
  $btnRemove.addEventListener('click', removeMenu);
  $btnSoldout.addEventListener('click', soldOutMenu);
};

const createMenu = function (menu) {
  const id = Date.now();
  menuList[menuCategoryName].push({ name: menu, id, soldOut: false });
  renderMenu(menuList[menuCategoryName]);
  menuCounter();
  handleButtons(id);
  setMenu(menuList);
};

const submitMenu = function (event) {
  event.preventDefault();

  const menuValue = $menuInput.value;
  if (!menuValue) {
    alert('원하는 메뉴를 입력해주세요.');
    return;
  }

  createMenu(menuValue);
  $menuInput.value = '';
};

$menuForm.addEventListener('submit', submitMenu);
$btnSubmitMenu.addEventListener('click', submitMenu);

const getMenu = JSON.parse(localStorage.getItem('menu'));
if (getMenu !== null) menuList = getMenu;

$btnMoonbucksMenu.addEventListener('click', event => {
  if (event.target.localName === 'nav') return;

  menuCategoryName = event.target.dataset.categoryName;
  menuName = event.target.innerText;
  $menuName.innerText = `${menuName} 메뉴 관리`;

  renderMenu(menuList[menuCategoryName]);
});

renderMenu(menuList[menuCategoryName]);
