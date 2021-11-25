var Model = /** @class */ (function () {
    function Model() {
        this.menu = {
            espresso: JSON.parse(localStorage.getItem("espresso")) || [],
            frappuchino: JSON.parse(localStorage.getItem("frappuchino")) || [],
            blended: JSON.parse(localStorage.getItem("blended")) || [],
            teavana: JSON.parse(localStorage.getItem("teavana")) || [],
            dessert: JSON.parse(localStorage.getItem("dessert")) || [],
        };
        this.selectedTab = "espresso";
    }
    Model.prototype.bindMenuListChanged = function (handler) {
        this.menuObserver = handler;
    };
    Model.prototype.onMenuChanged = function () {
        this.menuObserver(this.menu[this.selectedTab]);
        localStorage.setItem(this.selectedTab, JSON.stringify(this.menu[this.selectedTab]));
    };
    Model.prototype.addMenu = function (menuName) {
        this.menu[this.selectedTab].push(menuName);
        this.onMenuChanged();
    };
    Model.prototype.editMenu = function (menuId, editedName) {
        this.menu[this.selectedTab][menuId] = editedName;
        this.onMenuChanged();
    };
    Model.prototype.deleteMenu = function (menuId) {
        this.menu[this.selectedTab].splice(menuId, 1);
        this.onMenuChanged();
    };
    Model.prototype.selectMenuTab = function (selectedTab) {
        this.selectedTab = selectedTab;
        this.onMenuChanged();
    };
    return Model;
}());
export default Model;
