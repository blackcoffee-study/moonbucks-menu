// 메뉴 추가
// 에스프레소 메뉴를 입력하고 확인 버튼을 누르면 메뉴가 추가된다.
// 에스프레소 메뉴를 입력하고 확인 버튼을 누르면 메뉴가 추가된다.
// 메뉴가 추가되고 나면, input은 빈 값으로 초기화된다.
// 입력값이 빈 값이라면 추가되지 않는다.
//  총 메뉴 갯수를 count하여 상단에 보여준다.

// 메뉴 수정
// 메뉴의 수정 버튼을 누르면 prompt창이 뜬다.
// prompt 창을 통해 이름을 입력받고 수정한다.

// 메뉴 삭제
// 메뉴 삭제 버튼을 클릭하면 confirm창이 뜬다.
// 총 메뉴 갯수를 count하여 상단에 보여준다.

// 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.

function Apps(){
  document.querySelector("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
// 메뉴 추가 함수
  const addMenuName = () => {
    const menuName = document.querySelector("#espresso-menu-name").value;
    console.log(document.querySelector("#espresso-menu-name").value);
    // 빈 값이면 추가되지 않는다.
    if(menuName === "") {
      alert("입력하세요!");
      return;
    }
    document.querySelector("#espresso-menu-list").insertAdjacentHTML("beforeend", 
    `
    <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuName}</span>
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
    </li>
    ` 
    );
    // input 값 초기화
    document.querySelector("#espresso-menu-name").value = "";
    // 총 갯수 세기
    document.querySelector(".menu-count").innerText = `총 ${document.querySelector("#espresso-menu-list").querySelectorAll("li").length}개`
  };
  // 메뉴 추가 엔터
  document.querySelector("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
      addMenuName();
    }
    
  });
  // 메뉴 추가 확인버튼
  document.querySelector("#espresso-menu-submit-button").addEventListener("click", (e) => {
    addMenuName();
  });
}

Apps();