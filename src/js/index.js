import MenuList from './model/MenuList.js';
import View from './view/View.js';
import Controller from './controller/Controller.js';

const menuList = new MenuList();
const view = new View(document);
const controller = new Controller(menuList, view);

// 이벤트 리스너 등록
const handleEnterPress = (e) => {
  if (e.key === 'Enter') {
    controller.addMenuName();
  }
};

const handleSubmitButtonClick = () => {
  controller.addMenuName();
};

const handleMenuListClick = (e) => {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  try {
    if (e.target.classList.contains('menu-edit-button')) {
      controller.editMenuName(e);
    } else if (e.target.classList.contains('menu-remove-button')) {
      controller.removeMenuName(e);
    }
  } catch (err) {
    alert(err);
  }
};

document
  .querySelector('#espresso-menu-form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
  });

document
  .querySelector('#espresso-menu-name')
  .addEventListener('keypress', handleEnterPress.bind(controller));

document
  .querySelector('#espresso-menu-submit-button')
  .addEventListener('click', handleSubmitButtonClick.bind(controller));

document
  .querySelector('#espresso-menu-list')
  .addEventListener('click', handleMenuListClick.bind(controller));
