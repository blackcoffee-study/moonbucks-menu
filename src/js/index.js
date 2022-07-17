import { $ } from './utils/dom.js';
import { MESSAGE } from './constants/constants.js';

const menuForm = $('#espresso-menu-form');
const menuInput = $('.input-field');
const menuCount = $('.menu-count');
const menuList = $('#espresso-menu-list');

// 메뉴 입력
menuForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // 메뉴명 중복 체크
  const isDuplicateMenu = checkDuplicateMenu(menuInput.value);
  if(isDuplicateMenu) {
    menuInput.value.length > 0 ? addMenu(menuInput.value) : alert(MESSAGE.EMPTY);
    menuForm.reset();
  }
});

// 메뉴 행 버튼 클릭
menuList.addEventListener('click', (e) => {
  const name = e.target.name;
  const row = e.target.closest('li').querySelector('.menu-name');
  const value = e.target.parentNode.firstElementChild.textContent;
  name === 'update' ? updateMenu(row, value) : deleteMenu(row); // 조건 추가되면 case 문으로 분기 필요
});

// 총 메뉴 개수 변경 처리
const countMenu = () => {
  const totalCount = document.querySelectorAll('.menu-list-item').length;
  menuCount.innerText = `총 ${totalCount} 개`;
}

// 메뉴 생성
const addMenu = (menu) => {
  const newMenu = `
    <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menu}</span>
        <button
        type="button"
        name="update"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        name="delete"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
      삭제
        </button>
    </li>
  `;
  menuList.insertAdjacentHTML('beforeend', newMenu);
  menuForm.reset();
  countMenu();
}

// 메뉴명 중복 체크
const checkDuplicateMenu = (menuName) => {

  let nameList = [];

  for(let row of document.querySelectorAll('.menu-name')) {
    nameList.push(row.innerText);
  }
  
  const isExistName = nameList.filter((n) => n === menuName);

  if(isExistName.length > 0) {
    alert(MESSAGE.DUPLICATE);
    menuForm.reset();
    return false;
  }

  return true;
}

// 메뉴 수정
const updateMenu = (row, value) => {

  const updateMenu = prompt(MESSAGE.UPDATE, value);

  if(updateMenu.length === 0) {
    alert(MESSAGE.EMPTY);
  } else {
    row.innerText = updateMenu;
  }

}

// 메뉴 삭제
const deleteMenu = (row) => {

  if(window.confirm(MESSAGE.DELETE)) {
    row.parentElement.remove();
    countMenu();
  }

}
