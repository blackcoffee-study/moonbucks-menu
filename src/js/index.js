const espressoMenuForm = document.querySelector("#espresso-menu-form");
const menuList = document.querySelector("#espresso-menu-list");

function App() {
  const addMenu = function(espressoNewMenu) {
      const menuTemplate = `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${espressoNewMenu}</span>
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

      menuList.insertAdjacentHTML("beforeend", menuTemplate);
  }

  const updateMenuCount = function() {
    const updateCount = document.querySelector(".menu-count");
    updateCount.innerText = `총 ${menuList.children.length} 개`;
  }

  const registerMenu = function(e) {
    e.preventDefault();
    const espressoMenuAdd = espressoMenuForm.querySelector("#espresso-menu-name");
    const newEspressoMenu = espressoMenuAdd.value;
    if (espressoMenuAdd.value.trim() === ""){
        alert("메뉴를 입력해주세요!");
        return;
    }
    espressoMenuAdd.value = "";
    addMenu(newEspressoMenu);
    updateMenuCount();
}

const updateMenuName = function(e) {
    const espressoMenuRename = e.target.closest("li").querySelector("span.menu-name");
    const renamedMenu = prompt("메뉴를 수정 하세요", espressoMenuRename.innerText);
    if (renamedMenu != null && renamedMenu.trim()){
      espressoMenuRename.innerText = renamedMenu;
    }
}
    
const removeMenuName = function(e) {
    const espressoMenuRemoved = e.target.parentElement;
    if (!confirm("메뉴를 삭제 하시겠습니까?")) return;
      espressoMenuRemoved.remove();
      updateMenuCount();
}


  espressoMenuForm.addEventListener("submit", (e) => {
    registerMenu(e);
  });

  menuList.addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")){
      updateMenuName(e);
    }else if (e.target.classList.contains("menu-remove-button")){
      removeMenuName(e);
    }
  })
}

App();

