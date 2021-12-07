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

function renderMenuList(menuArrs, event) {
  $menuList.innerText = ''; 
  menuArrs.map((menuArr) => {
    const li = document.createElement('li');
    const menuLi = $menuList.appendChild(li);
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
      const $targetMenuName = event.target.closest("li").remove();
    };
  });


function undateCount(menuArrs) {
  const totalNum = menuArrs.length;
  $totalNum.innerText = `총 ${totalNum}개`
}

$addMenuBtn.addEventListener('click', addMenu)
$addMenuBtn.addEventListener('keypress', addMenu)
