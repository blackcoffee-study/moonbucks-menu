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
            if (!Array.isArray(node.xEvents)) {
                node.xEvents = [];
            }
            node.xEvents.push(event);
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

class Template {
    constructor() {
        this.root = null;
        this.eventUsed = [];
    }

    press(xStore) {
        return this.root.press(xStore);
    }

    parse(rootDomNode) {
        this.root = this._parse(rootDomNode);
    }

    /**
     * @param {Node} currentDomNode
     */
    _parse(currentDomNode) {
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

                    if (this.eventUsed.indexOf(property) === -1) {
                        this.eventUsed.push(property);
                    }
                }
            });

            for (const child of currentDomNode.childNodes) {
                const ch = this._parse(child);
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
        /** @type {Element} */
        this.el = config.el;
        this.template = new Template();
        this.template.parse(this.el);
        this.data = {};
        this.methods = {};
    }

    setHandler(el) {
        this.template.eventUsed.forEach(eventType => {
            el.addEventListener(eventType, e => {
                const xEvents = e.target.xEvents;
                if (Array.isArray(xEvents)) {
                    const eventInfo = xEvents.find(evt => evt.property === eventType);
                    if (eventInfo) {
                        const args = eventInfo.value.split(",");
                        this.methods[args[0]].apply(this, [e, ...args.slice(1).map(v => getProp(this.data, v))]);
                    }
                }
            });
        });
    }

    render() {
        const vnode = this.template.press({
            data: this.data,
            methods: this.methods,
        });

        this.setHandler(vnode);
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
