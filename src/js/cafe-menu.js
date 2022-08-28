import {$} from "./utils/dom.js";
import store from "./store/store.js";
import MenuApi from "./api/index.js";

function App() {

    this.init = async () => {
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

    const render = async () => {
        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
        const template = this.menu[this.currentCategory].map((item, index) => {
            console.log(item);
            return `<li data-menu-id="${item.id}" class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name ${item.isSoldOut ? "sold-out" : ""}">${item.name}</span> 
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
        render();
        $("#menu-name").value = '';
    };

    const updateMenuName = async (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
        await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);
        render();
    };

    const removeMenuName = async (e) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            const menuId = e.target.closest("li").dataset.menuId;
            await MenuApi.deleteMenu(this.currentCategory, menuId);
            render();
        }
    };

    const updateMenuCount = () => {
        const menuCount = this.menu[this.currentCategory].length;
        $(".menu-count").innerText = `총 ${menuCount} 개`;
    }

    const soldOutMenu = async (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
        render();
    };

    const changeCategory = (e) => {
        const isCategoryButton = e.target.classList.contains("cafe-category-name");
        if (isCategoryButton) {
            const categoryName = e.target.dataset.categoryName;
            this.currentCategory = categoryName;
            $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
            render();
        }
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

        $("nav").addEventListener("click", changeCategory);

    };

}

const app = new App();
app.init();