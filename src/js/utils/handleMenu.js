import Menu from '../data/menu.js';
import { getmenulistElement } from './elements.js';
import { $ } from './common.js';

/*TODO : 메뉴 카테고리화 적용*/

const menuNameTag = $('#espresso-menu-name');
const menuListUlTag = $('#espresso-menu-list');
const menuCountTag = $('.menu-count');

//메뉴 추가
function addMenu() {
	let menuName = menuNameTag.value;
	if(menuName && menuName !== '') {
    menuListUlTag.insertAdjacentHTML('beforeend', getmenulistElement(menuName));
    document.querySelector('#espresso-menu-name').value = '';
    Menu.push(menuName);
    //커피 개수 증가
    changeCountMenu();
  }
}

//메뉴 수정
function editMenu(menuListLiTag) {
  const menuNameTag = menuListLiTag.querySelector('.menu-name');
  let newMenu = prompt(`수정하실 메뉴이름을 입력하세요`);
  if(newMenu !== '') {
    menuNameTag.innerText = newMenu;
  }
}

//메뉴 삭제
function removeMenu(menuListLiTag) {
  const message = '해당 메뉴를 삭제하시겠습니까?';

  if(confirm(message)) {
    menuListUlTag.removeChild(menuListLiTag);
  }
  changeCountMenu();
}

//메뉴 품절 관리
function setSoldOutMenu(menuListLiTag) {
  const soldOutTag = menuListLiTag.querySelector('.menu-sold-out-button');
  if(!soldOutTag) return;
  
  if(soldOutTag.classList.contains('sold-out')) {
    soldOutTag.classList.remove('sold-out');
  } else {
    soldOutTag.classList.add('sold-out');
  }
}

function changeCountMenu() {
  const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
  menuCountTag.innerHTML = `총 ${menuCount}개`;
}

export { addMenu, editMenu, removeMenu, setSoldOutMenu };