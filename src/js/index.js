import { XApp } from "./xapp/index.js";

function createApp() {
    const app = new XApp({
        el: document.getElementById("app"),
    });

    app.setMethods({
        createMenu(e) {
            e.preventDefault();
            if (this.data.menuInput !== "") {
                this.data.menuList.push({ key: this.data.menuSerial, content: this.data.menuInput });
                this.data.menuSerial++;
                this.data.menuCount++;
                this.data.menuInput = "";
                this.render();
                this.elements.menuInput.focus();
            }
        },
        onMenuInputChange(e) {
            this.data.menuInput = e.target.value;
        },
        editMenu(e, item) {
            const changed = prompt("새로운 메뉴 이름을 입력해주세요.", item.content);
            if (changed) {
                item.content = changed;
                this.render();
            }
        },
        deleteMenu(e, item) {
            const shouldDelete = confirm(`정말 ${item.content} 메뉴를 삭제하시겠습니까?`);
            if (shouldDelete) {
                const idx = this.data.menuList.indexOf(item);
                this.data.menuList.splice(idx, 1);
                this.render();
            }
        },
    });

    app.setData({
        menuList: [],
        menuInput: "",
        menuCount: 0,
        menuSerial: 0,
    });

    app.render();

    return app;
}

window.addEventListener("load", createApp);
