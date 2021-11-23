{
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
                return "<li class=\"menu-list-item d-flex items-center py-2\" data-menu-id=" + index + ">\n    <span class=\"w-100 pl-2 menu-name\">" + menu + "</span>\n    <button\n    type=\"button\"\n    name=\"soldOut\"\n    class=\"bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button\"\n  >\n    \uD488\uC808\n  </button>\n    <button\n    type=\"button\"\n    name=\"edit\"\n    class=\"bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button\"\n    >\n    \uC218\uC815\n    </button>\n    <button\n    type=\"button\"\n    name=\"delete\"\n    class=\"bg-gray-50 text-gray-500 text-sm menu-remove-button\"\n    >\n    \uC0AD\uC81C\n    </button>\n    </li>";
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
    var Controller = /** @class */ (function () {
        function Controller(model, view) {
            var _this = this;
            this.render = function (menuList) {
                _this.view.renderMenuList(menuList);
                _this.view.renderMenuCount(menuList);
            };
            this.handleAddMenu = function (event) {
                event.preventDefault();
                var name = _this.view.menuName;
                if (!name) {
                    return window.alert("메뉴 이름을 입력해주세요.");
                }
                _this.model.addMenu(name);
                _this.view.resetInput();
            };
            this.handleEditMenu = function (event) {
                if (event.target.name === "edit") {
                    var editedName = window.prompt("수정할 메뉴 이름을 입력해주세요");
                    if (editedName) {
                        var menuId = event.target.parentNode.dataset.menuId;
                        _this.model.editMenu(menuId, editedName);
                    }
                }
            };
            this.handleDeleteMenu = function (event) {
                if (event.target.name === "delete") {
                    var deleteConfirm = window.confirm("메뉴를 삭제하시겠습니까?");
                    if (deleteConfirm) {
                        var menuId = event.target.parentNode.dataset.menuId;
                        _this.model.deleteMenu(menuId);
                    }
                }
            };
            this.handleClickMenuTab = function (event) {
                var categoryName = event.target.dataset.categoryName;
                _this.model.selectMenuTab(categoryName);
            };
            this.handleSoldOutMenu = function (event) {
                if (event.target.name === 'soldOut') {
                    var menuText = event.target.parentNode.childNodes[1];
                    menuText.classList.add('sold-out');
                }
            };
            this.model = model;
            this.view = view;
            this.render(this.model.menu.espresso);
            this.view.bindAddMenu(this.handleAddMenu);
            this.view.bindEditMenu(this.handleEditMenu);
            this.view.bindDeleteMenu(this.handleDeleteMenu);
            this.view.bindClickMenuTab(this.handleClickMenuTab);
            this.view.bindSoldOutMenu(this.handleSoldOutMenu);
            this.model.bindMenuListChanged(this.render);
        }
        return Controller;
    }());
    var app = new Controller(new Model(), new View());
}
