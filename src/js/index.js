const $menuCount = document.querySelector('.menu-count');
const $espressoMenuForm = document.querySelector('#espresso-menu-form');
const $espressoMenuInput = $espressoMenuForm.querySelector('input');
const $btnSubmitEspressoMenu = $espressoMenuForm.querySelector('button');
const $espressoMenuList = document.querySelector('#espresso-menu-list');

let menuList = [];

const menuCounter = function () {
  $menuCount.innerText = `총 ${menuList.length}개`;
};

const editEspressoMenu = function (event) {
  const li = event.target.parentElement;
  const menuName = li.children[0];
  const editEspressoMenuValue = prompt(
    '메뉴명을 수정하세요.',
    menuName.innerText
  );
  if (editEspressoMenuValue === null) return;

  menuList = menuList.map(
    menu => menu.id === parseInt(li.id) && (menu.name = editEspressoMenuValue)
  );
  menuName.innerText = editEspressoMenuValue;
};

const removeEspressonMenu = function (event) {
  const li = event.target.parentElement;
  const removeConfirm = confirm('정말 삭제하시겠습니까?');
  if (removeConfirm) {
    li.remove();
    menuList = menuList.filter(menu => menu.id !== parseInt(li.id));
    menuCounter();
  }
};

const printEspressoMenu = function (name) {
  const id = Date.now();
  $espressoMenuList.insertAdjacentHTML(
    'beforeend',
    `
    <li class="menu-list-item d-flex items-center py-2" id=${id}>
        <span class="w-100 pl-2 menu-name">${name}</span>
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
  );
  menuList.push({ name, id });
  menuCounter();

  const $menuItem = document.getElementById(`${id}`);
  const $btnEdit = $menuItem.querySelector('.menu-edit-button');
  const $btnRemove = $menuItem.querySelector('.menu-remove-button');

  $btnEdit.addEventListener('click', editEspressoMenu);
  $btnRemove.addEventListener('click', removeEspressonMenu);
};

const submitEspressoMenu = function (event) {
  event.preventDefault();

  const espressoMenuValue = $espressoMenuInput.value;
  if (!espressoMenuValue) {
    alert('원하는 에스프레소 메뉴를 입력해주세요.');
    return;
  }

  printEspressoMenu(espressoMenuValue);
  $espressoMenuInput.value = '';
};

$espressoMenuForm.addEventListener('submit', submitEspressoMenu) ||
  $btnSubmitEspressoMenu.addEventListener('click', submitEspressoMenu);
