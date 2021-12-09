import  { menuItemTemplate } from "./template/menu.js"

const $addMenuBtn = document.getElementById("espresso-menu-submit-button");
const $menuList = document.getElementById("espresso-menu-list");
const $inputMenu = document.getElementById("espresso-menu-name");
const $totalNum = document.querySelector(".menu-count");
const menuArrs = [];
const store = {
  setLocalStorage(menuArrs) {
    localStorage.setItem("menu", JSON.stringify(menuArrs))
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  }
}

const isMenuInputEmpty = (e) => {
  const inputMenuName = document.getElementById("espresso-menu-name").value
  if(inputMenuName == ''){
    return;
  } else {
    addMenuList(inputMenuName);
    $inputMenu.value = '';
  }
}

const addMenuList = (inputMenuName) => {
  menuArrs.push({ menuName: inputMenuName });
  store.setLocalStorage(menuArrs);
  renderMenuList(menuArrs);
  undateCount(menuArrs);
}

const renderMenuList = (menuArrs, event) => {
  $menuList.innerText = ''; 
  const template = menuArrs.map((menuArr) => {
    return menuItemTemplate(menuArr)
  }).join('');
  $menuList.innerHTML = template;

};

const removeItemFromArray = ($targetMenuName) => {
  const menuIdx = menuArrs.indexOf(menuName);
  menuArrs.splice(menuIdx, 1)
}

const undateCount = (menuArrs) => {
  const totalNum = menuArrs.length;
  $totalNum.innerText = `총 ${totalNum}개`
}


  
$menuList.addEventListener('click', function updateMenu(event) {
  if (event.target.classList.contains('menu-edit-button')) {
    const $targetMenuName = event.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt(
      "수정하고 싶은 메뉴명을 입력해주세요!",
    );
    $targetMenuName.innerText = updatedMenuName;
  }
  if (event.target.classList.contains('menu-remove-button')) {
    if (updatedMenuName === null) return;
    confirm(
      "선택하신 메뉴를 삭제하시겠습니까?",
    );
    const $targetMenuName = event.target.closest("li");
    $targetMenuName.remove(); // render함수에서 해결할 수 있으면 좋겠다.
    removeItemFromArray($targetMenuName);
    undateCount(menuArrs);
  };
});

$addMenuBtn.addEventListener('click', isMenuInputEmpty)
$addMenuBtn.addEventListener('keypress', isMenuInputEmpty)
