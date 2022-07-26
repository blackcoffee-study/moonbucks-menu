const $ = (selector) => document.querySelector(selector);
  
function App() {

  const createMenuName = () => {

    if($("#espresso-menu-name").value === ""){
      alert("값을 입력해주세요");
      return;
    }

      const espressoMenuName = $("#espresso-menu-name").value;
      
      $("#espresso-menu-list").insertAdjacentHTML("beforeend", menuItemTemplate(espressoMenuName));
      updateMenuCount();
      $("#espresso-menu-name").value = "";

  };
  
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll('li').length;
    $(".menu-count").innerText = `총 ${menuCount} 개`
  };

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
  </li>`
  };

  const removeMenuName = (e) => {
    e.target.closest("li").remove();
    updateMenuCount(); 
  };

  const editMenuName = (e) =>{
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const editedName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    if(!editedName) return;
    $menuName.innerText = editedName;
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")){
      editMenuName(e);
    }

    if(e.target.classList.contains("menu-remove-button")){
      if(confirm("정말 삭제하시겠습니까?")){
        removeMenuName(e);
      }
    }
  });

  // form 태그가 자동으로 전송되는 걸 막기
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  })
  
  // 메뉴의 이름을 입력 받기
  $("#espresso-menu-name").addEventListener("keydown", (e) => {
    if(e.key !== "Enter") return;
    createMenuName();
    });
  
  $("#espresso-menu-submit-button").addEventListener("click", createMenuName);
}

App();