function App() {
    // 입력된 메뉴를 메뉴리스트에 추가하는 함수
    const addMenuList = () => {
        const espressoMenuName = document.getElementById("espresso-menu-name").value;
        const espressoMenuList = document.getElementById("espresso-menu-list");
        if(espressoMenuName.trim() == "") return
        else {
            espressoMenuList.innerHTML +=  `<li class="menu-list-item d-flex items-center py-2">
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
            `;
            document.getElementById("espresso-menu-name").value = "";
        }
    }

    // 새로운 메뉴를 입력하고 확인 버튼을 누르면 메뉴를 추가한다.
    document.getElementById("espresso-menu-submit-button").addEventListener("click", () => {
        addMenuList();
        document.getElementById("espresso-menu-name").focus();
    })

    // 새로운 메뉴를 입력하고 엔터키를 누르면 메뉴를 추가한다.
    document.getElementById("espresso-menu-name").addEventListener("keypress", (e) => {
        if (e.key != "Enter") {
            return;
        }

        document.getElementById("espresso-menu-form").addEventListener("submit", (e) => {
            e.preventDefault();
        });

        addMenuList();
    });
}

App();
