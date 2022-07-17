
const $ = (selector) => document.querySelector(selector);

function App() {

    const addMenuName = (e) => {
        if ($("#espresso-menu-name").value === "") {
            alert("값을 입력해주세요");
            return;
        }
        const espressoMenuName = $("#espresso-menu-name").value;
        const menuItemTemplate = (espressoMenuName) => {
            return `<li class="menu-list-item d-flex items-center py-2">
                        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
                        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
                        <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button></li>`;
        };
        $("#espresso-menu-list").insertAdjacentHTML('beforeend', menuItemTemplate(espressoMenuName));
        updateMenuCount();
        $("#espresso-menu-name").value = '';
    };

    const updateMenuName = (e) => {
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
        $menuName.innerText = updatedMenuName;
    };

    const removeMenuName = (e) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            e.target.closest("li").remove();
        }
        updateMenuCount();
    };

    const updateMenuCount = () => {
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`;
    }

    // 메뉴 수정 및 삭제
    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
        }

        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
    });

    // form태그 전송 방지
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    // 버튼 클릭 메뉴 추가
    $("#espresso-menu-submit-button").addEventListener("click", () => {
        addMenuName();
    });

    // 엔터키 메뉴 추가
    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return;
        }
        addMenuName();
    });
}

App();