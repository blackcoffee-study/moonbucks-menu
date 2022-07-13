let currentId = 1;
const menuList = [];

const menuInputEl = document.querySelector('#espresso-menu-name');
const submitBtnEl = document.querySelector('#espresso-menu-submit-button');

submitBtnEl.addEventListener('click', onAdd);

function onAdd() {
  const inputValue = menuInputEl.value;
  alert(inputValue);
}

function makeMenuElement() {
  const menuListEl = document.querySelector('#espresso-menu-list');
  const menuEl = document.createElement('li');
  const nameEl = document.createElement('span');
  nameEl.innerHTML = '비가 왜케 오노';

  const modifyBtnEl = document.createElement('button');
  modifyBtnEl.innerHTML = '수정';

  const deleteBtnEl = document.createElement('button');
  deleteBtnEl.innerHTML = '삭제';
  menuEl.appendChild(nameEl);
  menuEl.appendChild(modifyBtnEl);
  menuEl.appendChild(deleteBtnEl);

  menuListEl.appendChild(menuEl);
  menuInputEl.value = '';
}
