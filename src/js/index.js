const init = () => {
  const $menuForm = document.querySelector('#espresso-menu-form');
  const $menuList = document.querySelector('#espresso-menu-list');

  $menuForm.addEventListener('submit', e => handleSubmit(e));
  $menuList.addEventListener('click', e => handleMenuListClick(e));
};

const handleMenuListClick = e => {
  const $menuItem = e.target.parentNode;
  const $target = e.target;

  if (hasClass($target, 'menu-edit-button')) {
    editMenu($menuItem);
  }
  if (hasClass($target, 'menu-remove-button')) {
    removeMenu($menuItem);
  }
};

const hasClass = ($target, className) => {
  return $target.classList.contains(className);
};

const editMenu = $menuItem => {
  const $menuName = $menuItem.querySelector('.menu-name');
  const text = window.prompt('메뉴명을 수정하세요', $menuName.textContent);

  if (text === null) return; // 취소한 경우
  if (isEmpty(text)) {
    alert('값을 입력해주세요');
    return;
  }
  $menuName.textContent = text;
};

const removeMenu = $menuItem => {
  const confirm = window.confirm('정말 삭제하시겠습니까?');
  if (confirm) {
    $menuItem.remove();
  }
};

const isEmpty = value => {
  return !(value && value.trim());
};

const createItemTemplate = name => {
  const $template = document.createElement('template');
  $template.innerHTML = `
    <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${name}</span>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
    </li>`;

  return $template;
};

const handleSubmit = e => {
  e.preventDefault();
  const $input = e.target[0];
  const $menuList = document.querySelector('#espresso-menu-list');
  if (isEmpty($input.value)) {
    alert('값을 입력해주세요');
    return;
  }
  appendMenu($input.value, $menuList);
  clearInput($input);
};

const appendMenu = (menu, $menuList) => {
  const $menuItem = createItemTemplate(menu).content;
  $menuList.append($menuItem);
};

const clearInput = $input => {
  $input.value = '';
};

window.onload = init;
