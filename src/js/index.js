//TODO 메뉴 추가
//[X] 에스프레스 메뉴에 새로운 메뉴를 엔터키 입력으로 추가한다.
//[X] 에스프레스 메뉴에 새로운 메뉴를 확인버튼 클릭으로 추가한다.
//[X] 사용자 입력값이 빈 값이라면 추가되지 않는다.
//[X] input를 추가하고 난 뒤 비워준다.
//[X] 총 메뉴 갯수를 count하여 상단에 보여준다.
//[X] 추가되는 메뉴의 아래 마크업은  `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.

//TODO 메뉴 수정
//[X] 메뉴 수정 버튼을 눌러 메뉴 이름을 수정할 수 있다.
//[X] 메뉴 수정시 브라우저에서 제공하는 'prompt' 인터페이스를 활용한다
//[X] 메뉴 수정시 prompt 창에는 defaultvalue로 원래 메뉴명이 들어있다.

//TODO 메뉴 삭제
//[X] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
//[X] 메뉴 삭제시 브라우저에서 제공하는 `confirm` 인터페이스를 활용한다.
//[] 총 메뉴 갯수를 count하여 상단에 보여준다.

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
    $(".menu-name").innerHTML = updatedMenuName;
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