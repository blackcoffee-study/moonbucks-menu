import { XApp } from "./xapp/index.js";
import { LocalStorageMenuAPI } from "./api.js";

function createApp() {
    const api = new LocalStorageMenuAPI();

    const app = new XApp({
        el: document.getElementById("app"),
    });

    app.setData({
        categories: [],
        categorySelected: {
            name: "",
            key: "",
        },
        menuList: [],
        menuInput: "",
        menuCount: 0,
    });

    app.setMethods({
        async createMenu(e) {
            e.preventDefault();
            if (this.data.menuInput !== "") {
                this.data.menuList.push({ content: this.data.menuInput });
                this.data.menuCount++;
                this.data.menuInput = "";
                await api.saveMenu(this.data.categorySelected.key, this.data.menuList);
                this.render();
                this.elements.menuInput.focus();
            }
        },
        onMenuInputChange(e) {
            this.data.menuInput = e.target.value;
        },
        async editMenu(e, item) {
            const changed = prompt("새로운 메뉴 이름을 입력해주세요.", item.content);
            if (changed) {
                item.content = changed;

                this.render();

                await api.saveMenu(this.data.categorySelected.key, this.data.menuList);
            }
        },
        async deleteMenu(e, item) {
            const shouldDelete = confirm(`정말 ${item.content} 메뉴를 삭제하시겠습니까?`);
            if (shouldDelete) {
                const idx = this.data.menuList.indexOf(item);
                this.data.menuList.splice(idx, 1);

                this.render();
                await api.saveMenu(this.data.categorySelected.key, this.data.menuList);
            }
        },
        async changeMenuType(e, item) {
            this.data.categorySelected = item;

            const menu = await api.getMenu(this.data.categorySelected.key);
            this.data.menuList = menu;

            this.render();
        },
    });

    app.setHooks({
        async onReady() {
            const categories = await api.getCategories();
            this.data.categories = categories;
            this.data.categorySelected = categories[0];

            // this.render();
            // await this.methods.changeMenuType(null, menuTypes[0]);
            this.render();
        },
    });

    app.start();

    return app;
}

window.addEventListener("load", createApp);
