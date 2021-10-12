// 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다.
// 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// 사용자 입력값이 빈 값이라면 추가되지 않는다.

// 메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
// 메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다.

// 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
// 메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다.
// 총 메뉴 갯수를 count하여 상단에 보여준다.

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
            return
        }

        document.getElementById("espresso-menu-form").addEventListener("submit", (e) => {
            e.preventDefault();
        });

        addMenuList();
    });
}

App();
