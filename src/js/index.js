const $ = (selector) => document.querySelector(selector);

function App() {
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    const addMenuName = () => {
        const espressoMenuName = $("#espresso-menu-name").value;
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
                </li>`;
        };
        const menuList = $("#espresso-menu-list");

        if (espressoMenuName === "" || espressoMenuName.trim() === "") {
            alert("메뉴명을 입력해주세요.");
        } else {
            menuList.insertAdjacentHTML(
                "beforeend",
                menuItemTemplate(espressoMenuName)
            );
        }

        updateMenuCount();

        $("#espresso-menu-name").value = "";
    };

    const updateMenuCount = () => {
        const menuList = $("#espresso-menu-list");
        const menuTotal = menuList.childElementCount;
        $(".menu-count").innerText = `총 ${menuTotal} 개`;
    };

    const updateMenuName = (e) => {
        const menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt(
            "메뉴명을 수정해주세요",
            menuName.innerText
        );
        menuName.innerText = updatedMenuName;
    };

    const removeMenuName = (e) => {
        if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
            e.target.closest("li").remove();

            updateMenuCount();
        }
    };

    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addMenuName();
        }
    });

    $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
        }
    });

    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
    });
}

App();
