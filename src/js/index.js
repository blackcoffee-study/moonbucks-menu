const $ = (selector) => document.querySelector(selector);

function App() {
  //변수 선언부
  const $menuForm = $("#espresso-menu-form");
  const $menuList = $("#espresso-menu-list");
  const $menuCount = $(".menu-count");
  const $menuName = $("#espresso-menu-name");
  const $menuSubmitButton = $("#espresso-menu-submit-button");
  //const $menuSubmitButton = document.getElementById("espresso-menu-submit-button");

  //함수 선언부
  //메뉴 추가
  const addMenu = () => {
    const espressoMenuName = $menuName.value;

    //공백 체크
    if (espressoMenuName === "") {
      return alert("메뉴를 입력해주세요.");
    }

    $menuList.insertAdjacentHTML("beforeend", menuItemTemplate(espressoMenuName));
    updateMenuCount();
  };

  //클릭하여 메뉴 등록
  $menuSubmitButton.addEventListener("click", addMenu);

  //엔터키로 메뉴 등록
  $menuName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addMenu();
    }
  });

  //메뉴 개수 count
  const updateMenuCount = () => {
    const menuCount = $menuList.querySelectorAll("li").length;
    $menuCount.innerText = `총 ${menuCount}개`;
    $menuName.value = ""; //빈값 초기화
  };

  //메뉴 수정
  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    $menuName.innerText = prompt("메뉴 이름을 수정하세요.", $menuName.innerText);
  };

  //메뉴 삭제
  const removeMenu = (e) => {
    if (confirm("메뉴를 삭제할까요?")) {
      e.target.closest("li").remove();
      updateMenuCount();
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

  //노드 추가를 위한 템플릿
  const menuItemTemplate = (espressoMenuName) => {
    return `<li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                  수정
                </button>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                  삭제
                </button>
              </li>`;
  };
}

App();
