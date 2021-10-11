import { XApp } from "./xapp/index.js";

function createApp() {
    const app = new XApp({
        el: document.getElementById("app"),
    });

    app.setMethods({
        createMenu() {
            console.log("create!");
        },
    });

    app.setData({
        item: {
            name: "asdf",
            tag: "tag",
        },
        menuData: [],
        count: 123,
    });

    const rendered = app.render();
    console.log(rendered);

    document.body.appendChild(rendered);

    return app;
}

window.addEventListener("load", createApp);
