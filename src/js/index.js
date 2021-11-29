import {$} from "./util/dom.js";
import store from "./store/index.js";

const EMPTY_STRING = "";

function App() {
    this.menu = {
        espresso: [],
        frappuccino: [],
        blended: [],
        teavana: [],
        desert: [],
    };
    this.currentCategory = "espresso";

    this.init = () => {
        if (store.getLocalStorage()) {
            this.menu = store.getLocalStorage();
        }
        render();
    }

    const render = () => {
        $("#menu-list").innerHTML = menuItemTemplate();
        updateMenuCount();
        initMenuNameValue();
    }

    const addMenu = () => {
        const espressoMenuName = $("#menu-name").value;

        if (espressoMenuName === EMPTY_STRING) {
            alert("추가할 메뉴 이름을 입력해주세요.");
            return;
        }

        this.menu[this.currentCategory].push({name: espressoMenuName});
        store.setLocalStorage(this.menu);
        render();
    };

    const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updateMenuName = prompt("메뉴 이름을 수정하세요.", $menuName.innerText);
        this.menu[this.currentCategory][menuId].name = updateMenuName;
        store.setLocalStorage(this.menu);
        render();
    }

    const deleteMenu = (e) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu[this.currentCategory].splice(menuId, 1);
            store.setLocalStorage(this.menu);
            render();
        }
    }

    const updateMenuCount = () => {
        let length = this.menu[this.currentCategory].length;
        $(".menu-count").innerText = `총 ${length} 개`;
    }

    const initMenuNameValue = () => {
        $("#menu-name").value = EMPTY_STRING;
    }

    const soldOutMenu = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
        store.setLocalStorage(this.menu);
        render();
    }

    $("#menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    $("#menu-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return;
        }
        addMenu();
    });

    $("#menu-submit-button").addEventListener("click", () => {
        addMenu();
    })

    $("#menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
            return;
        }
        if (e.target.classList.contains("menu-remove-button")) {
            deleteMenu(e);
            return;
        }
        if (e.target.classList.contains("menu-sold-out-button")) {
            soldOutMenu(e);
            return;
        }
    })

    $("nav").addEventListener("click", (e) => {
        const isCategoryButton = e.target.classList.contains(("cafe-category-name"));
        if (isCategoryButton) {
            this.currentCategory = e.target.dataset.categoryName;
            $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
            render();
        }
    });

    const menuItemTemplate = () => {
        return this.menu[this.currentCategory].map((menuItem, index) => {
            return `
                <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name ${menuItem.soldOut ? "sold-out" : ""}">${menuItem.name}</span>
                <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
                >
                    품절
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
        }).join("");
    }
}

const app = new App();
app.init();
