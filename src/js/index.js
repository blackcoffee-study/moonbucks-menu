const $input = document.getElementById('espresso-menu-name');

// menuList = [{name: string; category: string; isSoldOut: boolean;}]
let menuList = [];
let category = 'espresso';

// events
const addMenuList = (name) => {
  if (!name) return;
  menuList = [...menuList, {name, category}];
  renderAboutMenus();
  $input.value = '';
};

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

const toggleIsSoldOut = ({target}) => {
  const menuId = Number(target.parentElement.dataset.menuId);
  menuList = menuList.map((menu, index) => 
    index === menuId ? {...menu, isSoldOut: !menu.isSoldOut} : menu,
  );

  const textClassList = target.previousElementSibling.classList;
  if (textClassList.contains('sold-out')) {
    textClassList.remove('sold-out')
  } else {
    textClassList.add('sold-out')
  }
};

const setCategory = (_category) => {
  if (!_category) return;
  category = _category;
  renderAboutMenus();
};

// addEventListeners
const addEventListenerToForm = () => {
  const $form = document.getElementById('espresso-menu-form');
  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    addMenuList($input.value);
  });
};

const addEventListenersToMenuList = () => {
  const $menu = document.getElementById('espresso-menu-list');

  $menu.addEventListener('click', (e) => {
    switch (e.target.dataset.action) {
      case 'edit': 
        editMenu(e);
        return;
      case 'remove':
        removeMenu(e);
        return;
      case 'sold-out':
        toggleIsSoldOut(e);
        return;
    }
  });
};

const addEventListenerToCategoryList = () => {
  const $categoryList = document.getElementById('cafe-category-name-list');
  $categoryList.addEventListener('click', ({target}) => {
    const selectedCategory = target.dataset.categoryName;
    if (!selectedCategory) return;
    
    setCategory(selectedCategory);
  });
};

window.onload = () => {
  addEventListenerToForm();
  addEventListenersToMenuList();
  addEventListenerToCategoryList();
};

// renders
const renderMenuList = () => {
  const $menuList = document.getElementById('espresso-menu-list');
  const menuListItemHtmls = menuList
    .filter(menu => menu.category === category)
    .map((menu, index) => {
    return `
      <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name${menu.isSoldOut ? ' sold-out' : ''}">${menu.name}</span>
        <button
          type="button"
          data-action="sold-out"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
          품절
          </button>
          <button
          type="button"
          data-action="edit"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
          수정
          </button>
          <button
          type="button"
          data-action="remove"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>
      `
  });
  $menuList.innerHTML = menuListItemHtmls.join('');
};

const renderMenuCount = () => {
  const $menuCount = document.querySelector('.menu-count');
  $menuCount.textContent = `총 ${menuList.length}개`;
};

const renderAboutMenus = () => {
  renderMenuList();
  renderMenuCount();
};
