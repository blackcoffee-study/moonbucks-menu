import MenuCount from "./MenuCount.js";
import RemoveEvent from "../event/RemoveEvent.js";
import EditEvent from "../event/EditEvent.js";
import MenuList from "./MenuList.js";

function Menu() {
    this.$inputText = document.getElementById("espresso-menu-name");
    this.$menuButton = document.getElementById("espresso-menu-submit-button");
    
    this.$menuList = new MenuList();
    this.$menuCount = new MenuCount();
    this.$removeEvent = new RemoveEvent();
    this.$editEvent = new EditEvent();

    this.menu = [];

    this.addMenu = (menuName) => {
        if(menuName == '') return;
        this.menu.push({name: menuName});
        this.$inputText.value = '';
        this.render();
    }

    this.render = () => {
        this.$menuList.setState(this.menu);
        this.updateMenuCount();
        this.initEventLisner();
    }

    this.initEventLisner = () => {
      this.$editEvent.setEvent(this.editEvent);
      this.$removeEvent.setEvent(this.removeEvent);
    }

    this.removeEvent = (event) => {
      if(confirm('정말 삭제하시겠습니까?')) {
        const menuId = event.target.closest("li").dataset.menuId;
        this.menu.splice(menuId, 1);
        this.render();
      }
    }
    
    this.editEvent = (event) => {
      const newValue = prompt('변경될 이름을 입력해주세요');
      const menuId = event.target.closest("li").dataset.menuId;
      this.menu[menuId].name = newValue;
      this.render();
    }

    this.updateMenuCount = () => {
        this.$menuCount.setState(this.menu.length);
    }

    this.enterEvent = (event) => {
      if(event.code === 'Enter') {
          event.preventDefault();
          this.addMenu(this.$inputText.value);
      }
    }

    this.$inputText.addEventListener('keypress', event => this.enterEvent(event));
    this.$menuButton.addEventListener('click', () => this.addMenu(this.$inputText.value));
}

export default Menu;