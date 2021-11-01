import { ElementTemplateNode, ForTemplateNode, TextTemplateNode } from "./nodes.js";

export class XAppTemplateParser {
    constructor() {
        this.eventUsed = [];
    }

    parse(currentDomNode) {
        return {
            root: this._parse(currentDomNode),
            eventUsed: [...this.eventUsed],
        };
    }

    /**
     * @param {Node} currentDomNode
     */
    _parse(currentDomNode) {
        const nodeParser = nodeParserFactory(currentDomNode, {
            childrenParser: node => this._parse(node),
        });
        const parsedResult = nodeParser.parse(currentDomNode);
        this.eventUsed = [...this.eventUsed, parsedResult.eventUsed];

        return parsedResult.node;
    }
}

function nodeParserFactory(currentDomNode, { childrenParser }) {
    if (currentDomNode instanceof Text) {
        const parser = new TextNodeParser();
        return parser;
    } else if (currentDomNode instanceof Element) {
        const parser = new ElementNodeParser(childrenParser);
        return parser;
    } else {
        throw new Error("Invalid node found");
    }
}

class TextNodeParser {
    parse(currentDomNode) {
        const textNode = new TextTemplateNode();
        const text = currentDomNode.data.trim();

        const formatter = this.createFormatter(text);
        textNode.setFormatter(formatter);

        return { node: textNode, eventUsed: [] };
    }

    createFormatter(text) {
        const templateRegex = /\${(.+?)}/g;
        const matches = [...text.matchAll(templateRegex)];

        const format = [];
        let last = 0;
        matches.forEach(match => {
            format.push({ type: "str", data: text.slice(last, match.index) });
            format.push({ type: "var", data: match[1] });
            last = match.index + match[0].length;
        });
        format.push({ type: "str", data: text.slice(last) });

        return format;
    }
}

class ElementNodeParser {
    constructor(childrenParser) {
        this.childrenParser = childrenParser;
    }
    parse(currentDomNode) {
        function getDirective(attr) {
            const property = attr.name.split(":")[1];
            const value = attr.textContent;
            return [property, value];
        }

        const eventUsed = [];

        const attrs = [...currentDomNode.attributes];
        const events = [];
        const elementNode = new ElementTemplateNode();

        attrs.forEach(attr => {
            if (attr.name?.startsWith("x-on")) {
                const property = attr.name.split(":")[1];
                const value = attr.textContent;

                events.push({ property, value });

                if (eventUsed.indexOf(property) === -1) {
                    eventUsed.push(property);
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

        attrs.forEach(attr => {
            if (attr.name?.startsWith("x-bind")) {
                const property = attr.name.split(":")[1];
                const value = attr.textContent;

                elementNode.binds.push({ property, value });
            }
        });

        for (const child of currentDomNode.childNodes) {
            const ch = this.childrenParser(child);
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

                return { node: forNode, eventUsed };
            }
        }

        return { node: elementNode, eventUsed };
    }
}
