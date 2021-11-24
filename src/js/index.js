function Apps(){
  document.querySelector("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
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
    countMenuNum();
    // input 값 초기화
    document.querySelector("#espresso-menu-name").value = "";
  };
  const countMenuNum = () => {
    document.querySelector(".menu-count").innerText = `총 ${document.querySelector("#espresso-menu-list").querySelectorAll("li").length}개`
  };
  document.querySelector("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (e.key === 'Enter') {
      
      addMenuName();
    }
    
  });
  document.querySelector("#espresso-menu-submit-button").addEventListener("click", (e) => {
    addMenuName();
  });
  document.querySelector("#espresso-menu-list").addEventListener("click", (e) => {
    if(e.target.classList.contains("menu-edit-button")) {
      const newMenuName = prompt("새로운 이름을 입력하세요.",e.target.closest("li").querySelector(".menu-name").innerText);
      if (newMenuName === "") {
        alert("no");
      }
      else if (!newMenuName !== "") {
        e.target.closest("li").querySelector(".menu-name").innerText = newMenuName;
      }
    }
    if(e.target.classList.contains("menu-remove-button")){
      if(confirm("삭제하시겠습니까?")) {
        e.target.closest("li").remove();
      }
    }
    countMenuNum();
  });
}

Apps();