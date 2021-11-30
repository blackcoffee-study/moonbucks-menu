import { $ } from "./utils/dom.js";
import store from "./store/index.js";

function App() {
    const menuList = $("#menu-list");

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
        renderMenu();
        initEventListener();
    };

    const renderMenu = () => {
        const template = this.menu[this.currentCategory]
            .map((menuItem, index) => {
                return `
                    <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                        <span class="${
                            menuItem.soldOut ? "sold-out" : ""
                        } w-100 pl-2 menu-name">${menuItem.name}</span>
                        <button
                            type="button"
                            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
                        >
                            품절
                        </button>
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
            })
            .join("");

        menuList.innerHTML = template;

        updateMenuCount();
    };

    const addMenuName = () => {
        const menuName = $("#menu-name").value;

        if (menuName === "" || menuName.trim() === "") {
            alert("메뉴명을 입력해주세요.");
            return;
        } else {
            this.menu[this.currentCategory].push({ name: menuName });

            store.setLocalStorage(this.menu);
            renderMenu();
        }

        $("#menu-name").value = "";
    };

    const updateMenuCount = () => {
        const menuTotal = this.menu[this.currentCategory].length;
        $(".menu-count").innerText = `총 ${menuTotal} 개`;
    };

    const updateMenuName = (e, targetMenu) => {
        const menuId = targetMenu.dataset.menuId;
        const menuName = targetMenu.querySelector(".menu-name");
        const updatedMenuName = prompt(
            "메뉴명을 수정해주세요",
            menuName.innerText
        );

        this.menu[this.currentCategory][menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);

        renderMenu();
    };

    const removeMenuName = (e, targetMenu) => {
        if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
            const menuId = targetMenu.dataset.menuId;
            this.menu[this.currentCategory].splice(menuId, 1);
            targetMenu.remove();
            store.setLocalStorage(this.menu);
            renderMenu();
        }
    };

    const soldOutMenu = (e, targetMenu) => {
        const menuId = targetMenu.dataset.menuId;
        this.menu[this.currentCategory][menuId].soldOut =
            !this.menu[this.currentCategory][menuId].soldOut;
        store.setLocalStorage(this.menu);

        renderMenu();
    };

    const initEventListener = () => {
        $("#menu-form").addEventListener("submit", (e) => {
            e.preventDefault();
        });

        $("#menu-name").addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                addMenuName();
            }
        });

        $("#menu-submit-button").addEventListener("click", addMenuName);

        $("#menu-list").addEventListener("click", (e) => {
            const targetMenu = e.target.closest("li");

            if (e.target.classList.contains("menu-edit-button")) {
                updateMenuName(e, targetMenu);
            }
            if (e.target.classList.contains("menu-remove-button")) {
                removeMenuName(e, targetMenu);
            }
            if (e.target.classList.contains("menu-sold-out-button")) {
                soldOutMenu(e, targetMenu);
            }
        });

        $("nav").addEventListener("click", (e) => {
            const isCategoryButton =
                e.target.classList.contains("cafe-category-name");
            if (isCategoryButton) {
                const categoryName = e.target.dataset.categoryName;
                this.currentCategory = categoryName;

                $(
                    "#category-title"
                ).innerText = `${e.target.innerText} 메뉴 관리`;
                renderMenu();
            }
        });
    };
}

const app = new App();
app.init();
