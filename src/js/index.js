//state
let currentId = 1;
const menuList = [];

const menuInputEl = document.querySelector('#espresso-menu-name');
const submitBtnEl = document.querySelector('#espresso-menu-submit-button');

submitBtnEl.addEventListener('click', onAdd);

function onAdd() {
  const currentInput = { id: currentId++, value: menuInputEl.value };
  menuList.push(currentInput);

  const menuListEl = document.querySelector('#espresso-menu-list');
  menuListEl.appendChild(makeMenuElement(currentInput));
  menuInputEl.value = '';
  updateCount();
}

function makeMenuElement(currentInput) {
  const menuEl = document.createElement('li');
  const nameEl = document.createElement('span');
  nameEl.innerHTML = currentInput.value;

  const modifyBtnEl = document.createElement('button');
  modifyBtnEl.innerHTML = '수정';
  modifyBtnEl.dataset.id = currentInput.id;
  modifyBtnEl.onclick = updateMenu;

  const deleteBtnEl = document.createElement('button');
  deleteBtnEl.innerHTML = '삭제';
  deleteBtnEl.dataset.id = currentInput.id;
  deleteBtnEl.onclick = deleteMenu;

  menuEl.appendChild(nameEl);
  menuEl.appendChild(modifyBtnEl);
  menuEl.appendChild(deleteBtnEl);

  return menuEl;
}

function updateMenu(e) {
  let ans = window.prompt('어떤 이름으로 수정하시겠어요?');
  if (!ans) return;

  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].id === e.target.dataset.id) {
      menuList[i].value = ans;
      break;
    }
  }
  updateMenuElement(e, ans);
}

function updateMenuElement(e, ans) {
  let parentEl = e.target.parentNode;
  let valueEl = parentEl.querySelector('span');
  valueEl.innerHTML = ans;
}

function deleteMenu(e) {
  let result = window.confirm('정말 삭제하시겠어요?');
  if (!result) return;

  let idx = menuList.findIndex(el => el.id === e.target.dataset.id * 1);
  menuList.splice(idx, 1);

  deleteMenuElement(e);
  updateCount();
}
function deleteMenuElement(e) {
  const menuListEl = document.querySelector('#espresso-menu-list');

  let parentEl = e.target.parentNode;
  menuListEl.removeChild(parentEl);
}

function updateCount() {
  const countEl = document.querySelector('.menu-count');
  const totalCount = menuList.length;
  countEl.innerHTML = `총 ${totalCount}개`;
}
