import { MenuCategory } from "../utils/type";

class Model {
  menu;
  selectedTab: MenuCategory;
  menuObserver: Function;
  constructor() {
    this.menu = {
      espresso: JSON.parse(localStorage.getItem("espresso")) || [],
      frappuchino: JSON.parse(localStorage.getItem("frappuchino")) || [],
      blended: JSON.parse(localStorage.getItem("blended")) || [],
      teavana: JSON.parse(localStorage.getItem("teavana")) || [],
      dessert: JSON.parse(localStorage.getItem("dessert")) || [],
    };
    this.selectedTab = "espresso";
  }

  bindMenuListChanged(handler) {
    this.menuObserver = handler;
  }

  onMenuChanged() {
    this.menuObserver(this.menu[this.selectedTab]);
    localStorage.setItem(
      this.selectedTab,
      JSON.stringify(this.menu[this.selectedTab])
    );
  }

  addMenu(menuName) {
    this.menu[this.selectedTab].push(menuName)

    this.onMenuChanged();
  }

  editMenu(menuId, editedName) {
    this.menu[this.selectedTab][menuId] = editedName;

    this.onMenuChanged();
  }

  deleteMenu(menuId) {
    this.menu[this.selectedTab].splice(menuId, 1)

    this.onMenuChanged();
  }

  selectMenuTab(selectedTab) {
    this.selectedTab = selectedTab;

    this.onMenuChanged();
  }
}

export default Model;
