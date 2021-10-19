const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("menu"));
    }
};

function App() {
    this.menu = [];

    this.menu = {
        espresso: [],
        frappuccino: [],
        blended: [],
        teavana: [],
        desert: []
    };

    this.currentCategory = "espresso";

    this.init = () => {
        if (store.getLocalStorage()) {
            this.menu = store.getLocalStorage();
        }
        render();
    };

    const render = () => {
        const template = this.menu[this.currentCategory].map((menuItem, index) => {
            return `
                <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
                </li> `;
        })
        .join("");

        $("#menu-list").innerHTML = template;

        updateMenuCount();
    }

    const addMenuName = () => {

        const menuName = $("#menu-name").value;

        if (menuName.trim() === "") {
            alert("값을 입력해주세요.");
            return
        }

        this.menu[this.currentCategory].push({name: menuName});
        store.setLocalStorage(this.menu);

        render();

        $("#menu-name").value = "";
    };

    const updateMenuCount = () => {
        const menuCount = $("#menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`;
    };

    const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
        this.menu[this.currentCategory][menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);
        $menuName.innerText = updatedMenuName;
    };

    const removeMenuName = (e) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu[this.currentCategory].splice(menuId, 1);
            e.target.closest("li").remove();
            store.setLocalStorage(this.menu);
        }
    };

    $("#menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    $("#menu-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return
        }
        addMenuName();
    });

    $("#menu-submit-button").addEventListener("click", addMenuName);

    $("#menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
        }
    });

    $("#menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
        updateMenuCount();
    });

    $("nav").addEventListener("click", (e) => {
        const isCategoryButton = e.target.classList.contains("cafe-category-name");
        if (isCategoryButton) {
            const categoryName = e.target.closest("button").dataset.categoryName;
            this.currentCategory = categoryName;

            $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
            $("#menu-name").placeholder = `${e.target.innerText.slice(3)} 메뉴 이름`;
            render();
        }
    })
}

const app = new App();

app.init();