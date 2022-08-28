import {$} from "./utils/dom.js";
import store from "./store/store.js";

const BASE_URL = "http://localhost:3000/api";

const MenuApi = {
    async getAllMenuByCategory(category) {
        const response = await fetch(`${BASE_URL}/category/${category}/menu`);
        return response.json();
    },

    async createMenu(category, name) {
        const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name}),
        })
        if (!response.ok) {
            console.error("에러가 발생했습니다.");
        }
    },
};

function App() {

    this.init = async () => {
        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
        render();
        initEventListeners();
    };

    this.menu = {
        espresso: [],
        frappuccino: [],
        blended: [],
        desert: [],
    };

    this.currentCategory = "espresso";

    const render = () => {
        const template = this.menu[this.currentCategory].map((item, index) => {
            return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name ${item.soldOut ? "sold-out" : ""}">${item.name}</span> 
                    <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">품절
                    <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
                    <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
                    </li>`;
        }).join("");
        $("#menu-list").innerHTML = template;
        updateMenuCount();
    };

    const addMenuName = async () => {
        if ($("#menu-name").value === "") {
            alert("값을 입력해주세요");
            return;
        }
        const menuName = $("#menu-name").value;
        await MenuApi.createMenu(this.currentCategory, menuName);
        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
        render();
        $("#menu-name").value = '';
    };

    const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
        if (updatedMenuName == null) {
            return false;
        }
        this.menu[this.currentCategory][menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);
        render();
    };

    const removeMenuName = (e) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu[this.currentCategory].splice(menuId.indexOf(), 1);
            store.setLocalStorage(this.menu);
            e.target.closest("li").remove();
            render();
        }
    };

    const updateMenuCount = () => {
        const menuCount = this.menu[this.currentCategory].length;
        $(".menu-count").innerText = `총 ${menuCount} 개`;
    }

    const soldOutMenu = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
        store.setLocalStorage(this.menu);
        render();
    };

    const initEventListeners = () => {
        $("#menu-list").addEventListener("click", (e) => {
            if (e.target.classList.contains("menu-edit-button")) {
                updateMenuName(e);
                return;
            }

            if (e.target.classList.contains("menu-remove-button")) {
                removeMenuName(e);
                return;
            }

            if (e.target.classList.contains("menu-sold-out-button")) {
                soldOutMenu(e);
                return;
            }
        });

        // form태그 전송 방지
        $("#menu-form").addEventListener("submit", (e) => {
            e.preventDefault();
        });

        // 버튼 클릭 메뉴 추가
        $("#menu-submit-button").addEventListener("click", () => {
            addMenuName();
        });

        // 엔터키 메뉴 추가
        $("#menu-name").addEventListener("keypress", (e) => {
            if (e.key !== "Enter") {
                return;
            }
            addMenuName();
        });

        $("nav").addEventListener("click", async (e) => {
            const isCategoryButton = e.target.classList.contains("cafe-category-name");
            if (isCategoryButton) {
                const categoryName = e.target.dataset.categoryName;
                this.currentCategory = categoryName;
                $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
                this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
                render();
            }
        });
    };

}

const app = new App();
app.init();