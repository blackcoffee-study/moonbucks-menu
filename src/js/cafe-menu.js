import {$} from "./utils/dom.js";
import store from "./store/store.js";

function App() {

    this.init = () => {
        if (store.getLocalStorage()) {
            this.menu = store.getLocalStorage();
            initEventListeners();
        }
        render();
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

    const addMenuName = () => {
        if ($("#menu-name").value === "") {
            alert("값을 입력해주세요");
            return;
        }
        const espressoMenuName = $("#menu-name").value;
        this.menu[this.currentCategory].push({name: espressoMenuName});
        store.setLocalStorage(this.menu);
        render();
        $("#menu-name").value = '';
    };

    const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
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

        $("nav").addEventListener("click", (e) => {
            const isCategoryButton = e.target.classList.contains("cafe-category-name");
            if (isCategoryButton) {
                const categoryName = e.target.dataset.categoryName;
                this.currentCategory = categoryName;
                $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
                render();
            }
        });
    };

}

const app = new App();
app.init();