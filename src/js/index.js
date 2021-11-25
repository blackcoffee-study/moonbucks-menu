import store from "./store/index.js";
import { $ } from "./util/dom.js";

function App() {
    this.menu = {
        espresso: [],
        frappuccino: [],
        blended: [],
        teavana: [],
        desert: []
    };
    const renderMenuItem = () => {
        //const isSoldOut = this.menu[this.menu.categoryName].item.isSoldOut;
        const template = this.menu[this.menu.categoryName].map((item, index) => {
            const isSoldOut = item.isSoldOut ? "sold-out" : "" ;
            console.log(isSoldOut);
            return `
                    <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                        <span class="w-100 pl-2 menu-name ${isSoldOut}">${item.name}</span>
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
                    </li>
                    `
        })
        $("#espresso-menu-list").innerHTML = template.join("");
        updateMenuCount();
    }
    const updateMenuCount = () => {
        const menuItemCount = this.menu[this.menu.categoryName].length;
        $(".menu-count").innerHTML = `총 ${menuItemCount}개`;
        $("#espresso-menu-name").value = "";
    }
    const addMenu = () => {
        const espressoMenuName = $("#espresso-menu-name").value;
        if (espressoMenuName === "") {
            return;
        }
        let isSoldOut = false;
        this.menu[this.menu.categoryName].push({name: espressoMenuName, isSoldOut});
        renderMenuItem();
        store.setLocalStorage(this.menu);
    }
    const updateMenu = (e) => {
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const menuId = e.target.closest("li").dataset.menuId;
        const updatedMenuName = window.prompt("메뉴를 수정하세요", $menuName.innerHTML);
        if (updatedMenuName === null) {
            return;
        }
        this.menu[this.menu.categoryName][menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu); 
        $menuName.innerHTML = updatedMenuName;
    }
    const removeMenu = (e) => {
        const removedMenu = window.confirm("메뉴를 삭제하시겠습니까?")
        if (removedMenu) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu[this.menu.categoryName].splice(menuId, 1);
            store.setLocalStorage(this.menu);
            e.target.closest("li").remove();
            renderMenuItem();
        }
    }
    const soldOutMenu = (e) => {
        e.target.closest("li").querySelector(".menu-name").classList.toggle("sold-out");
        const menuId = e.target.closest("li").dataset.menuId;
        this.menu[this.menu.categoryName][menuId].isSoldOut = this.menu[this.menu.categoryName][menuId].isSoldOut ? false : true;
        store.setLocalStorage(this.menu);
    
    }
    const initEventListeners = () => {
        $("#espresso-menu-form").addEventListener("submit", function (e) {
            e.preventDefault();
        });
        $("#espresso-menu-name").addEventListener("keydown", function (e) {
            if (e.key === 'Enter') {
                addMenu()
            }
        });
        $("#espresso-menu-submit-button").addEventListener("click", function (e) {
            addMenu();
        });
        $("#espresso-menu-list").addEventListener("click", function (e) {
            if (e.target.classList.contains("menu-edit-button")) {
                updateMenu(e);
            }
            if (e.target.classList.contains("menu-remove-button")) {
                removeMenu(e);
            }
            if (e.target.classList.contains("menu-sold-out-button")) {
                soldOutMenu(e);
            }
        });
        $(".cafe-category").addEventListener("click", function(e) {
                app.ChangeCategoryName(e);
        });
    }
    this.ChangeCategoryName = (e) => {
        if (e.target.classList.contains("cafe-category-name")) {
            console.log(this);
            this.menu.categoryName = e.target.dataset.categoryName;
            $("#cafe-category-title").innerHTML = `${e.target.innerHTML} 메뉴 관리`;
            renderMenuItem();
        }
    }
    this.init = () => {
        if (store.getLocalStorage() != undefined){
            this.menu = store.getLocalStorage();
        }
        console.log("work");
        this.menu.categoryName = "espresso";
        renderMenuItem();
        initEventListeners();
    }
}

const app = new App();
app.init();