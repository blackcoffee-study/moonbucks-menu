const BUTTON = Object.freeze({
    EDIT: "menu-edit-button",
    REMOVE: "menu-remove-button",
    SOLDOUT: "menu-sold-out-button"
});

const CATEGORYNAME = Object.freeze({
    espresso: "☕ 에스프레소",
    frappuccino: "🥤 프라푸치노",
    blended: "🍹 블렌디드",
    teavana: "🫖 티바나",
    desert: "🍰 디저트"
});

let info = {
    _category: "espresso",

    get category() { return this._category; }, 
    set category(value) { this._category = value; },
}

class menuInfo {
    constructor(menuName, soldoutClass="") {
        this.menuName = menuName;
        this.soldoutClass = soldoutClass;
    }
}