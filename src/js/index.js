function App() {
    const menuName = document.querySelector("#espresso-menu-name"),
    menuForm = document.querySelector("#espresso-menu-form"),
    menuList = document.querySelector("#espresso-menu-list"),
    menuCount = document.querySelector(".menu-count"),
    menuSubmitButton = document.querySelector("#espresso-menu-submit-button");

    // 수정, 삭제버튼 이벤트핸들링 처리
    menuList.addEventListener("click", (e) => {
        if(e.target.classList.contains("menu-edit-button")) {
            const reMenuName = e.target.closest("li").querySelector(".menu-name"),
            updatedMenu = prompt("메뉴명을 수정하세요", reMenuName.innerText);
            reMenuName.innerText = updatedMenu;
        }

        if(e.target.classList.contains("menu-remove-button")) {
            if(confirm("정말 삭제하시겠습니까?")) {
                e.target.closest("li").remove();
                countMenu();
            }
        }
    })

    // form 태그가 자동으로 전송되는 것을 방지
    menuForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    // 메뉴 추가함수
    const addMenu = () => {
        const espressoMenuName = menuName.value;
        if(espressoMenuName === "") {
            alert("값을 입력해주세요");
            return;
        }
        menuList.insertAdjacentHTML(
            "beforeend", 
            menuItemTemplate(espressoMenuName)
        );
        countMenu();
        menuName.value = "";
    }

    // 갯수 카운팅 함수
    const countMenu = () => {
        const menuCnt = menuList.querySelectorAll("li").length;
        menuCount.innerText = `총 ${menuCnt} 개`;
    }

    // 확인 버튼에 대한 이벤트 핸들링
    menuSubmitButton.addEventListener("click", () => {
        addMenu();
    });

    // 메뉴 입력받기
    menuName.addEventListener("keypress", (e) => {
        if(e.key !== "Enter") return;
        addMenu();
    });

    // 메뉴아이템 템플릿함수
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
    }
}

App();