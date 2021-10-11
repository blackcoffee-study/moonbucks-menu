class TemplateNode {
    constructor() {
        this.children = [];
    }

    press() {
        throw new Error("Not Implemented");
    }
}

class TextTempltaeNode extends TemplateNode {
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

    press(xStore) {
        const node = document.createTextNode(this.format(xStore.data));
        return node;
    }
}

class ElementTemplateNode extends TemplateNode {
    constructor() {
        super();
        this.el = null;
        /** @type {{property: string, value: string}[]} */
        this.events = [];
    }

    press(xStore) {
        /** @type {Element} */
        const node = this.el.cloneNode();

        this.events.forEach(event => {
            node.addEventListener(event.property, e => {
                if (event.value.indexOf("(") === -1) {
                    xStore.methods[event.value].call(xStore, e);
                }
            });
        });

        this.children.forEach(child => {
            node.appendChild(child.press(xStore));
        });

        return node;
    }
}

/**
 *
 * @param {Object} obj
 * @param {string[] | string} path
 */
function getProp(obj, path = []) {
    if (!Array.isArray(path)) {
        return getProp(obj, path.split("."));
    }
    if (path.length === 0) {
        return obj;
    }
    return getProp(obj[path[0]], path.slice(1));
}

class TemplateParser {
    constructor() {}

    /**
     * @param {Node} currentDomNode
     */
    parse(currentDomNode) {
        if (currentDomNode instanceof Text) {
            const textNode = new TextTempltaeNode();
            const text = currentDomNode.data.trim();
            const re = /\${(.+?)}/g;
            const matches = [...text.matchAll(re)];

            if (matches.length > 0) {
                const format = [];
                let last = 0;
                matches.forEach(match => {
                    format.push({ type: "str", data: text.slice(last, match.index) });
                    format.push({ type: "var", data: match[1] });
                    last = match.index + match[0].length;
                });
                format.push({ type: "str", data: text.slice(last) });

                textNode.setFormatter(format);
            } else {
                textNode.setFormatter([{ type: "str", data: text }]);
            }
            return textNode;
        } else if (currentDomNode instanceof Element) {
            const elementNode = new ElementTemplateNode();
            elementNode.el = currentDomNode;

            const attrs = [...currentDomNode.attributes];
            attrs.forEach(attr => {
                if (attr.name?.startsWith("x-on")) {
                    const property = attr.name.split(":")[1];
                    const value = attr.textContent;

                    elementNode.events.push({ property, value });
                }
            });

            for (const child of currentDomNode.childNodes) {
                const ch = this.parse(child);
                if (ch) {
                    elementNode.children.push(ch);
                }
            }

            return elementNode;
        }

        return null;
    }
}

export class XApp {
    constructor(config) {
        this.el = config.el;
        this.template = new TemplateParser().parse(this.el);
        this.methods = {};
    }

    render() {
        const vnode = this.template.press({
            data: this.data,
            methods: this.methods,
        });
        return vnode;
    }

    setMethods(handlers) {
        for (const key in handlers) {
            this.methods[key] = handlers[key];
        }
    }

    setData(data) {
        this.data = { ...data };
    }
}
