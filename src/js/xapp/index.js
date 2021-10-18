import { TextTempltaeNode, ElementTemplateNode, ForTemplateNode } from "./nodes.js";
import { getProp } from "./util.js";

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
            function getDirective(attr) {
                const property = attr.name.split(":")[1];
                const value = attr.textContent;
                return [property, value];
            }

            const attrs = [...currentDomNode.attributes];
            const events = [];
            const elementNode = new ElementTemplateNode();

            attrs.forEach(attr => {
                if (attr.name?.startsWith("x-on")) {
                    const property = attr.name.split(":")[1];
                    const value = attr.textContent;

                    events.push({ property, value });

                    if (this.eventUsed.indexOf(property) === -1) {
                        this.eventUsed.push(property);
                    }
                }
            });

            elementNode.events = events;
            elementNode.el = currentDomNode;

            attrs.forEach(attr => {
                if (attr.name?.startsWith("x-name")) {
                    const value = attr.textContent;

                    elementNode.name = value;
                }
            });

            for (const child of currentDomNode.childNodes) {
                const ch = this._parse(child);
                if (ch) {
                    elementNode.children.push(ch);
                }
            }

            for (const attr of attrs) {
                if (attr.name?.startsWith("x-for")) {
                    const [, value] = getDirective(attr);
                    const forNode = new ForTemplateNode();
                    forNode.target = elementNode;
                    forNode.dataPath = value;

                    return forNode;
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
        this.elements = {};
        this.hooks = {};
    }

    setHandler(el) {
        this.template.eventUsed.forEach(eventType => {
            el.addEventListener(eventType, e => {
                const xEvents = e.target.xEvents;
                if (Array.isArray(xEvents)) {
                    const eventInfo = xEvents.find(evt => evt.property === eventType);
                    if (eventInfo) {
                        const args = eventInfo.value.split(",");
                        const data = { ...this.data, ...eventInfo.binding };
                        const values = args.slice(1).map(v => getProp(data, v));
                        this.methods[args[0]].apply(this, [e, ...values]);
                    }
                }
            });
        });
    }

    render() {
        const vnode = this.template.press(this);

        this.setHandler(vnode);

        this.el.replaceWith(vnode);
        this.el = vnode;
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

    setHooks(hooks) {
        for (const key in hooks) {
            this.hooks[key] = hooks[key];
        }
    }

    async start() {
        this.render();
        if (this.hooks.onReady) {
            await this.hooks.onReady.call(this);
        }
    }
}
