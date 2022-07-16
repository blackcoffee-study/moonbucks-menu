export default class Menu {
    constructor(name) {
        this.name = name;
    }

    updateMenuName(newName) {
        if (!newName) {
            return;
        }
        this.name = newName;
    }
}