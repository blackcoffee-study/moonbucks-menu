

const $ = (selector) => document.querySelector(selector);

function updateMenuCount() {
    const menuItemCount = document.querySelectorAll(".menu-list-item");
    $(".menu-count").innerHTML = `총 ${menuItemCount.length}개`;
    $("#espresso-menu-name").value = "";
}
function addEspressoMenu() {
    const espressoMenuName = $("#espresso-menu-name").value;
    if (espressoMenuName === "") {
        return;
    }
    const menuItemTemplate = (espressoMenuName) => {
        return `
                <li class="menu-list-item d-flex items-center py-2">
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
                </li>
                `
    }
    $("#espresso-menu-list").insertAdjacentHTML(
        "beforeend",
        menuItemTemplate(espressoMenuName))
    updateMenuCount();
}
function updateEspressoMenu(e) {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = window.prompt("메뉴를 수정하세요", $menuName.innerHTML);
    if (updatedMenuName === null) {
        return;
    }
    $menuName.innerHTML = updatedMenuName;
}
function removeEspressoMenu(e) {
    const removedMenu = window.confirm("메뉴를 삭제하시겠습니까?")
    if (removedMenu) {
        e.target.closest("li").remove();
        updateMenuCount();
    }
}

function App() {
    $("#espresso-menu-form").addEventListener("submit", function (e) {
        e.preventDefault();
    });
    $("#espresso-menu-name").addEventListener("keydown", function (e) {
        if (e.key === 'Enter') {
            addEspressoMenu()
        }
    });
    $("#espresso-menu-submit-button").addEventListener("click", function (e) {
        addEspressoMenu();
    });
    $("#espresso-menu-list").addEventListener("click", function (e) {
        if (e.target.classList.contains("menu-edit-button")) {
            updateEspressoMenu(e);
        }
        if (e.target.classList.contains("menu-remove-button")) {
            removeEspressoMenu(e);
        }
    });
}

App();