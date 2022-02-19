export default class CustomSet {
    constructor() {
        this.data = {};
    }

    add(datum) {
        this.data[datum] = datum;
    }

    delete(datum) {
        delete this.data[datum];
    }

    has(datum) {
        return this.data.hasOwnProperty(datum);
    }

    clear() {
        this.data = {};
    }

    size() {
        return Object.keys(this.data).length;
    }

    getValues() {
        return Object.values(this.data);
    }

    getData() {
        return this.data;
    }
}
