// 함수명 변수명 카멜케이스로 변경하기
// 익명함수로 변경하기

import addNewItem from './addNewItem.js';
import manageMenuItem from './manageItems.js';
import inputEventHandler from './inputEventHandler.js';
import countMenuItems from './countMenuItems.js';

const menuList = document.getElementById('espresso-menu-list');
const inputForm = document.getElementById('espresso-menu-form');
const inputTag = document.getElementById('espresso-menu-name');
const inputBtn = document.getElementById('espresso-menu-submit-button');
let itemCount = document.querySelector('.menu-count');

function app() {
  manageMenuItem();
  countMenuItems();
  inputEventHandler();
}

app();

export { menuList, inputForm, inputTag, inputBtn, itemCount };
