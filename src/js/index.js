function App() {
    const $ = (selector) => document.querySelector(selector);
    const EMPTY_STRING = "";

    const addMenu = () => {
        const espressoMenuName = $("#espresso-menu-name").value;

        if (espressoMenuName === EMPTY_STRING) {
            alert("값을 입력해주세요.");
            return;
        }

        $("#espresso-menu-list").insertAdjacentHTML(
            "beforeend", menuItemTemplate(espressoMenuName)
        )
        updateMenuCount();
    };

    const updateMenuCount = () => {
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`;
        $("#espresso-menu-name").value = EMPTY_STRING;
    }

    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return;
        }
        addMenu();
    });

    $("#espresso-menu-submit-button").addEventListener("click", () => {
        addMenu();
    })

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
