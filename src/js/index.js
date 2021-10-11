import { XApp } from "./xapp/index.js";

function createApp() {
    const app = new XApp({
        el: document.getElementById("app"),
    });

    app.setMethods({
        createMenu(e) {
            console.log("create!", e);
        },
        inputChange(e) {
            console.log("change!", e);
        },
        menuEdit(e, item) {
            console.log("edit!", e, item);
        },
    });

    app.setData({
        menuList: [
            { key: 0, content: "1234" },
            { key: 1, content: "5678" },
        ],
        count: 123,
    });

    window.data = app.data;

    const rendered = app.render();

    document.body.appendChild(rendered);

    return app;
}

window.addEventListener("load", createApp);
