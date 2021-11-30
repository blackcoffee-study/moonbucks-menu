import menuItemTemplate from './menuItemTemplate.js';
import soldoutTemplate from './soldoutTemplate.js';
import store from './store.js'

const $ = (selector) => document.querySelector(selector);

function App() {
  //변수 선언부
  const $menuForm = $("#espresso-menu-form");
  const $menuList = $("#espresso-menu-list");
  const $menuCount = $(".menu-count");
  const $menuName = $("#espresso-menu-name");
  const $menuSubmitButton = $("#espresso-menu-submit-button");
  //const $menuSubmitButton = document.getElementById("espresso-menu-submit-button");

  let menuList = [];

  //메뉴 개수 count
  const updateMenuCount = (menuCount) => {
    $menuCount.innerText = `총 ${menuCount}개`;
  };
  
  function render(menuList){
    return menuList.map(menuItemTemplate).join("")
  }

  function setMenuList(func){
    menuList = func(menuList);
    console.log("menuList : ", menuList)

    updateMenuCount(menuList.length);
    $menuName.value = ""; //빈값 초기화

    $menuList.innerHTML = render(menuList);
  }

  //메뉴 추가
  const addMenu = () => {
    const espressoMenuName = $menuName.value;

    //공백 체크
    if (espressoMenuName === "") {
      return alert("메뉴를 입력해주세요.");
    }

    setMenuList(old => [...old, $menuName.value]);
  };

  //클릭하여 메뉴 등록
  $menuSubmitButton.addEventListener("click", addMenu);

  //엔터키로 메뉴 등록
  $menuName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addMenu();
    }
  });


  //메뉴 수정
  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");    const targetName = $menuName.innerText;
    const newMenuName = prompt("메뉴 이름을 수정하세요.", targetName);

    setMenuList(old => old.map(name => (name === targetName ? newMenuName : name)));
  };

  //메뉴 삭제
  const removeMenu = (e) => {
    if (confirm("메뉴를 삭제할까요?")) {
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      const targetName = $menuName.innerText;
      
      setMenuList(old => old.filter(menu => menu !== targetName));
    }
  };

  //실행부
  //submit 이벤트, prevent
  $menuForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });


  //메뉴 수정,삭제
  $menuList.addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenu(e);
    }
  });
}

App();
