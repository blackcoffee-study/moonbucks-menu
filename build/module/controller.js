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
export default Controller;
