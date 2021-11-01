import { XAppTemplateParser } from "./parser.js";
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
        const parser = new XAppTemplateParser();
        const result = parser.parse(rootDomNode);
        this.eventUsed = result.eventUsed;
        this.root = result.root;
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
