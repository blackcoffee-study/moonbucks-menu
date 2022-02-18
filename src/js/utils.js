import store, { ADD_ESPRESSO_MENU, UPDATE_ESPRESSO_MENU, DELETE_ESPRESSO_MENU } from './reducer.js';

const $menuForm = document.querySelector('#espresso-menu-form');
const $menuInput = $menuForm.querySelector('input');
const $menuList = document.querySelector('#espresso-menu-list');
const $menuCount = document.querySelector('.menu-count');

export const getButtonTemplate = ({ type, className }) => {
  return `<button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm ${className}"
    data-type=${type}
  >
    ${type === 'edit' ? '수정' : '삭제'}
  </button>`;
};

export const getMenuListTemplate = ({ id, name }) => {
  return `<li class="menu-list-item d-flex items-center py-2" data-id="${id}">
    <span class="w-100 pl-2 menu-name">${name}</span>
    ${getButtonTemplate({ type: 'edit', className: 'mr-1 menu-edit-button' })}
    ${getButtonTemplate({ type: 'remove', className: 'menu-remove-button' })}
  </li>`;
};

export const addMenu = (e) => {
  e.preventDefault();

  // random id 생성
  const id = Math.floor(new Date().valueOf() * Math.random()).toString();
  const name = $menuInput.value;

  store.dispatch({
    type: ADD_ESPRESSO_MENU,
    data: { id, name},
  });
  $menuInput.value = '';
};

export const updateMenu = (target) => {
  const { id } = target.parentNode.dataset;
  const newName = prompt('메뉴를 입력해주세요.');
  store.dispatch({
    type: UPDATE_ESPRESSO_MENU,
    data: { id, name: newName },
  });
}

export const removeMenu = (target) => {
  const { id } = target.parentNode.dataset;
  const result = confirm('정말 삭제하시나요?');
  if (result) {
    store.dispatch({
      type: DELETE_ESPRESSO_MENU,
      data: id,
    })
  }
};

export const render = () => {
  const { menuList } = store.getState();
  $menuCount.innerText = `총 ${menuList.length}개`;

  const template = menuList.map((menu) => getMenuListTemplate(menu)).join('');
  $menuList.innerHTML = template;
};
