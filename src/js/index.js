const $input = document.getElementById('espresso-menu-name');
const $form = document.getElementById('espresso-menu-form');

// menuList = [{name: string, category: string}]
let menuList = [];
let category = 'espresso';

const editMenu = ({target}) => {
  if (!target.classList.contains('menu-edit-button')) return;
  const name = window.prompt('메뉴명을 수정하세요');
  if (!name) return;

  const menuId = Number(target.parentElement.dataset.menuId);
  menuList = menuList.map((menu, index) => index === menuId ? {...menu, name} : menu);
  renderAboutMenus();
};

const removeMenu = ({target}) => {
  if (!target.classList.contains('menu-remove-button')) return;
  if (!window.confirm('정말 삭제하시겠습니까?')) return;

  const menuId = Number(target.parentElement.dataset.menuId);
  menuList = menuList.filter((_, index) => index !== menuId);
  renderAboutMenus();
};

const addMenuList = (name) => {
  if (!name) return;
  menuList = [...menuList, {name, category}];
  renderAboutMenus();
  $input.value = '';
};

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  addMenuList(e.target.value);
});

const addEventListenersToMenuList = () => {
  const $menu = document.getElementById('espresso-menu-list');
  $menu.addEventListener('click', editMenu);
  $menu.addEventListener('click', removeMenu);
}

const renderMenuList = () => {
  const $menuList = document.getElementById('espresso-menu-list');
  const menuListItemElements = menuList.map((menu, index) => {
    return `
      <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menu.name}</span>
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
  });
  $menuList.innerHTML = menuListItemElements.join('');
  addEventListenersToMenuList();
};

const renderMenuCount = () => {
  const $menuCount = document.querySelector('.menu-count');
  $menuCount.innerHTML = `총 ${menuList.length}개`;
};

const renderAboutMenus = () => {
  renderMenuList();
  renderMenuCount();
};
