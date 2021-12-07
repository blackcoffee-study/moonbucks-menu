import  { menuItemTemplate } from "./template/menu.js"

const $addMenuBtn = document.getElementById("espresso-menu-submit-button");
const $menuList = document.getElementById("espresso-menu-list");
const $inputMenu = document.getElementById("espresso-menu-name");
const $totalNum = document.querySelector(".menu-count");
const menuArrs = []

function addMenu(e) {
  const inputMenuValue = document.getElementById("espresso-menu-name").value
  if(inputMenuValue == ''){
    return;
  } else {
    addMenuList(inputMenuValue);
    $inputMenu.value = '';
  }
}

function addMenuList(inputMenuValue) {
  menuArrs.push(inputMenuValue);
  renderMenuList(menuArrs);
  undateCount(menuArrs);
}

const removeItemFromArray = ($targetMenuName) => {
  const menuName = $targetMenuName.querySelector('.menu-name').innerText;
  const menuIdx = menuArrs.indexOf(menuName);
  menuArrs.splice(menuIdx, 1)
}

function undateCount(menuArrs) {
  const totalNum = menuArrs.length;
  $totalNum.innerText = `총 ${totalNum}개`
}

function renderMenuList(menuArrs, event) {
  $menuList.innerText = ''; 
  menuArrs.map((menuArr) => {
    $menuList.insertAdjacentHTML(
      'beforeend',
      menuItemTemplate(menuArr)
    )
  });
  };
  
$menuList.addEventListener('click', function updateMenu(event) {
  if (event.target.classList.contains('menu-edit-button')) {
    const $targetMenuName = event.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt(
      "수정하고 싶은 메뉴명을 입력해주세요!",
    );
    if (updatedMenuName === null) return;
    $targetMenuName.innerText = updatedMenuName;
  }
  if (event.target.classList.contains('menu-remove-button')) {
    confirm(
      "선택하신 메뉴를 삭제하시겠습니까?",
    );
    const $targetMenuName = event.target.closest("li");
    $targetMenuName.remove(); // render함수에서 해결할 수 있으면 좋겠다.
    removeItemFromArray($targetMenuName);
    undateCount(menuArrs);
  };
});

$addMenuBtn.addEventListener('click', addMenu)
$addMenuBtn.addEventListener('keypress', addMenu)
