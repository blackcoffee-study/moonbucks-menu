// JS에서 DOM엘리먼트를 가져올때 관용적으로 $표시를 많이 사용한다.
const $ = (selector) => document.querySelector(selector);
function App(){
  const updateMenuCount = ()=> {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  }

  const addMenuName = () => {
    if($("#espresso-menu-name").value === '') return;
    const espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressoMenuName) => {return `<li class="menu-list-item d-flex items-center py-2">
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
  </li>`};
  $("#espresso-menu-list").insertAdjacentHTML(
    'beforeend', 
    menuItemTemplate(espressoMenuName)
    );
    updateMenuCount();
    $("#espresso-menu-name").value = '';
  }
  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedName = prompt("수정할 이름을 입력해주세요.", $menuName.innerText);
    $menuName.innerText = updatedName;
  }
  const removeMenuName = (e) => {
    if(confirm("정말 삭제하시겠습니까?")){
      e.target.closest("li").remove();
      updateMenuCount();
    }
  }
  $("#espresso-menu-list").addEventListener("click", (e)=> {
    if(e.target.classList.contains("menu-edit-button")){
      updateMenuName(e);
    }
    if(e.target.classList.contains("menu-remove-button")){
      removeMenuName(e);
    }
  });

  $("#espresso-menu-form")
        .addEventListener("submit", (e)=> {
            e.preventDefault()
      });

      $("#espresso-menu-submit-button").addEventListener("click", addMenuName)
    $("#espresso-menu-name")
        .addEventListener("keypress", (e) => {
          if(e.key !== 'Enter') return;
          addMenuName();
          
        });
}

App();