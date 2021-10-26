import { XApp } from "./xapp/index.js";
import { ServerMenuAPI } from "./api.js";

function createApp() {
    const api = new ServerMenuAPI();

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
                try {
                    const newMenu = await api.createMenu(this.data.categorySelected.key, this.data.menuInput);
                    this.data.menuList.push(newMenu);
                    this.data.menuCount++;
                    this.data.menuInput = "";
                } catch (e) {
                    alert(e.data.message);
                    return;
                }

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
                try {
                    await api.editMenu(this.data.categorySelected.key, { ...item, content: changed });
                } catch (e) {
                    alert(e.data.message);
                    return;
                }
                item.content = changed;

                this.render();
            }
        },
        async deleteMenu(e, item) {
            const shouldDelete = confirm(`정말 ${item.content} 메뉴를 삭제하시겠습니까?`);
            if (shouldDelete) {
                const idx = this.data.menuList.indexOf(item);
                this.data.menuList.splice(idx, 1);
                this.data.menuCount = this.data.menuList.length;

                this.render();
                await api.deleteMenu(this.data.categorySelected.key, item);
            }
        },
        async soldoutMenu(e, item) {
            const newItem = await api.soldOutMenu(this.data.categorySelected.key, item);

            item.soldout = newItem.soldout;

            this.render();
        },
        async changeMenuType(e, item) {
            this.data.categorySelected = item;

            const menu = await api.getMenu(this.data.categorySelected.key);
            this.data.menuList = menu;
            this.data.menuCount = menu.length;

            this.render();
        },
    });

    app.setHooks({
        async onReady() {
            const categories = await api.getCategories();
            this.data.categories = categories;
            this.data.categorySelected = categories[0];

            await this.methods.changeMenuType.call(this, null, categories[0]);
            this.render();
        },
    });

    app.start();

    return app;
}

window.addEventListener("load", createApp);
