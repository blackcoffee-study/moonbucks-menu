var View = /** @class */ (function () {
    function View() {
        this.input = document.querySelector("#espresso-menu-name");
        this.form = document.querySelector("#espresso-menu-form");
        this.menuList = document.querySelector("#espresso-menu-list");
        this.menuCount = document.querySelector(".menu-count");
        this.categoryButtons = document.querySelectorAll('button[data-category-name]');
    }
    Object.defineProperty(View.prototype, "menuName", {
        get: function () {
            return this.input.value;
        },
        enumerable: false,
        configurable: true
    });
    View.prototype.resetInput = function () {
        return (this.input.value = "");
    };
    View.prototype.getMenuElement = function (menuList) {
        return menuList.map(function (menu, index) {
            return "<li class=\"menu-list-item d-flex items-center py-2\" data-menu-id=" + index + ">\n  <span class=\"w-100 pl-2 menu-name\">" + menu + "</span>\n  <button\n  type=\"button\"\n  name=\"soldOut\"\n  class=\"bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button\"\n>\n  \uD488\uC808\n</button>\n  <button\n  type=\"button\"\n  name=\"edit\"\n  class=\"bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button\"\n  >\n  \uC218\uC815\n  </button>\n  <button\n  type=\"button\"\n  name=\"delete\"\n  class=\"bg-gray-50 text-gray-500 text-sm menu-remove-button\"\n  >\n  \uC0AD\uC81C\n  </button>\n  </li>";
        })
            .join("");
    };
    View.prototype.renderMenuList = function (menus) {
        while (this.menuList.firstChild) {
            this.menuList.removeChild(this.menuList.firstChild);
        }
        if (!menus) {
            return;
        }
        var menuListElement = this.getMenuElement(menus);
        this.menuList.innerHTML = menuListElement;
    };
    View.prototype.renderMenuCount = function (menus) {
        if (!menus) {
            return this.menuCount.innerText = '총 0개';
        }
        this.menuCount.innerText = "\uCD1D " + menus.length + "\uAC1C";
    };
    View.prototype.bindAddMenu = function (handler) {
        this.form.addEventListener("submit", function (event) { return handler(event); });
    };
    View.prototype.bindEditMenu = function (handler) {
        this.menuList.addEventListener("click", function (event) { return handler(event); });
    };
    View.prototype.bindDeleteMenu = function (handler) {
        this.menuList.addEventListener("click", function (event) { return handler(event); });
    };
    View.prototype.bindClickMenuTab = function (handler) {
        this.categoryButtons.forEach(function (button) {
            return button.addEventListener("click", function (event) { return handler(event); });
        });
    };
    View.prototype.bindSoldOutMenu = function (handler) {
        this.menuList.addEventListener("click", function (event) { return handler(event); });
    };
    return View;
}());
export default View;
