import { getProp } from "./util.js";

export class TemplateNode {
    constructor() {
        this.children = [];
    }

    press() {
        throw new Error("Not Implemented");
    }
}

export class TextTempltaeNode extends TemplateNode {
    constructor() {
        super();
        /** @type {{type: "str" | "var", data: string}[]} */
        this.template = [];
    }

    setFormatter(format) {
        this.template = format;
    }

    format(vars) {
        return this.template
            .map(value => {
                if (value.type === "str") {
                    return value.data;
                } else if (value.type === "var") {
                    return getProp(vars, value.data);
                }
            })
            .join("");
    }

    press(xApp, binding = {}) {
        const node = document.createTextNode(this.format({ ...xApp.data, ...binding }));
        return node;
    }
}

export class ElementTemplateNode extends TemplateNode {
    constructor() {
        super();
        this.el = null;
        /** @type {{property: string, value: string, binding: Object}[]} */
        this.events = [];
        this.name = null;
    }

    press(xApp, binding = {}) {
        /** @type {Element} */
        const node = this.el.cloneNode();

        this.events.forEach(event => {
            if (!Array.isArray(node.xEvents)) {
                node.xEvents = [];
            }
            node.xEvents.push({ property: event.property, value: event.value, binding: binding });
        });

        if (this.name) {
            xApp.elements[this.name] = node;
        }

        this.children.forEach(child => {
            let arr = child.press(xApp, binding);
            if (!Array.isArray(arr)) {
                arr = [arr];
            }
            arr.forEach(ch => node.appendChild(ch));
        });

        return node;
    }
}

export class ForTemplateNode extends TemplateNode {
    constructor() {
        super();
        this.target = null;
        this.dataPath = null;
    }

    press(xStore, binding) {
        const data = getProp(xStore.data, this.dataPath);
        const nodes = data.map(item => {
            return this.target.press(xStore, { item, ...binding });
        });
        return nodes;
    }
}
