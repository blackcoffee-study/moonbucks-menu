import View from './view/View.js';
import Controller from './controller/Controller.js';

const view = new View(document);
const controller = new Controller(view);

// 이벤트 리스너 등록
const _doesContainClass = (e, className) => {
  return e.target.classList.contains(className);
};

const handleNavClick = (e) => {
  if (_doesContainClass(e, 'cafe-category-name')) {
    controller.loadCategory(e);
  }
};

const handleEnterPress = (e) => {
  if (e.key === 'Enter') {
    controller.addMenuItem();
  }
};

const handleSubmitButtonClick = () => {
  controller.addMenuItem();
};

const handleMenuListClick = (e) => {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  // try {
  if (_doesContainClass(e, 'menu-edit-button')) {
    controller.editMenuItem(e);
  } else if (_doesContainClass(e, 'menu-remove-button')) {
    controller.removeMenuItem(e);
  } else if (_doesContainClass(e, 'menu-sold-out-button')) {
    controller.setMenuSoldOut(e);
  }
  // } catch (err) {
  //   alert(err);
  // }
};

document
  .querySelector('nav')
  .addEventListener('click', handleNavClick.bind(controller));

document
  .querySelector('#menu-form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
  });

document
  .querySelector('#menu-name')
  .addEventListener('keypress', handleEnterPress.bind(controller));

document
  .querySelector('#menu-submit-button')
  .addEventListener('click', handleSubmitButtonClick.bind(controller));

document
  .querySelector('#menu-list')
  .addEventListener('click', handleMenuListClick.bind(controller));
