document.addEventListener("DOMContentLoaded", () => {
  //이벤트 핸들링을 위한 변수(상수) 설정
  const mainInput = document.querySelector("#espresso-menu-name");
  const mainForm = document.querySelector("#espresso-menu-form");
  const mainList = document.querySelector("#espresso-menu-list");
  mainList.style.listStyle = "none";
  const mainButton = document.querySelector("#espresso-menu-submit-button");
  const mainCount = document.querySelector(".mr-2.mt-4.menu-count");
  console.log(mainCount);

  //개수 구하는 함수 선언
  const counter = () => {
    const count = document.getElementsByTagName("li").length;
    mainCount.textContent = `총 ${count}개`;
  };

  //제품 카테고리 버튼별 이름에 따른 변경사항
  const h2 = document.querySelector("h2");
  const cafeItems = document.getElementsByClassName(
    "cafe-category-name btn bg-white shadow mx-1"
  );

  const cafeMenuName = [
    "☕ 에스프레소",
    "🥤 프라푸치노",
    "🍹 블렌디드",
    "🫖 티바나",
    "🍰 디저트",
  ];

  for (let i = 0; i < cafeItems.length; i++) {
    cafeItems[i].addEventListener("click", () => {
      mainList.textContent = "";
      h2.textContent = `${cafeMenuName[i]} 메뉴 관리`;
      mainInput.placeholder = `${cafeMenuName[i].slice(2)} 메뉴 이름`;
    });
  }

  //리스트 추가하는 이벤트
  mainForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!mainInput.value.trim()) {
      alert("값을 입력하세요.");
      return;
    }
    //리스트 추가 버튼 누를 시에(혹은 엔터)추가되는 리스트 변수(상수) 설정
    const menuList = document.createElement("li");
    const menuText = document.createElement("span");
    const menuSoldOut = document.createElement("button");
    const menuModify = document.createElement("button");
    const menuDelete = document.createElement("button");

    menuText.textContent = mainInput.value;
    mainInput.value = "";
    menuSoldOut.textContent = "품절";
    menuModify.textContent = "수정";
    menuDelete.textContent = "삭제";

    menuList.appendChild(menuText);
    menuList.appendChild(menuDelete);
    menuList.appendChild(menuModify);
    menuList.appendChild(menuSoldOut);

    //버튼 우측 정렬
    menuSoldOut.style.float = "right";
    menuModify.style.float = "right";
    menuDelete.style.float = "right";

    mainList.appendChild(menuList);
    counter(); //개수 1증가

    //품절
    menuSoldOut.addEventListener("click", () => {
      if (menuText.style.textDecoration === "line-through") {
        menuText.style.textDecoration = "none";
      } else {
        menuText.style.textDecoration = "line-through";
      }
    });

    //수정
    menuModify.addEventListener("click", () => {
      const newText = prompt("수정할 메세지를 입력하세요", "");
      if (!newText.trim()) {
        alert("값을 입력하세요.");
        return;
      } else {
        menuText.textContent = newText;
      }
    });

    //제거
    menuDelete.addEventListener("click", (event) => {
      if (confirm("정말 삭제하시겠습니까?")) {
        event.target.parentNode.remove();
      }
    });
  });
});
