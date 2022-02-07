import * as api from "./api.js";

export default class Controllerr {
  constructor({ views, store }) {
    this.store = store;

    this.menuFormView = views.menuFormView;
    this.menuHeadingView = views.menuHeadingView;
    this.menuListView = views.menuListView;
    this.navView = views.navView;

    this.currentCategory = "espresso";

    this.init().then(() => {
      this.bindEvent();
    });
  }

  async init() {
    const fetchedMenuList = await api.getMenuList({ category: "espresso" });
    this.store.setMenuList({
      category: "espresso",
      menuList: fetchedMenuList,
    });
    const localMenuList = this.getCurrentCategoryMenuList();
    this.render({ menuList: localMenuList });
  }

  bindEvent() {
    this.navView.on("@changeCategory", async ({ detail: category }) => {
      this.currentCategory = category;
      let localMenuList = this.getCurrentCategoryMenuList();
      if (!localMenuList) {
        const fetchedMenuList = await api.getMenuList({ category });
        this.setCurrentCategoryMenuList({ menuList: fetchedMenuList });
        return;
      }
      this.render({ menuList: localMenuList });
    });

    this.menuFormView.on("@postMenu", async ({ detail }) => {
      try {
        const newMenu = await api.postMenu({
          category: this.getCurrentCategory(),
          menuName: detail,
        });
        const newMenuList = [...this.getCurrentCategoryMenuList(), newMenu];
        this.setCurrentCategoryMenuList({ menuList: newMenuList });
      } catch (err) {
        alert(err.message);
      }
    });

    this.menuListView
      .on("@deleteMenu", async ({ detail }) => {
        try {
          await api.deleteMenu({
            category: this.getCurrentCategory(),
            menuId: detail.menuId,
          });
          const newMenuList = this.getCurrentCategoryMenuList().filter(
            (menu) => menu.id !== detail.menuId
          );
          this.setCurrentCategoryMenuList({ menuList: newMenuList });
        } catch (err) {
          alert(err);
        }
      })
      .on("@toggleSoldOut", async ({ detail }) => {
        try {
          const newMenu = await api.updateMenuSoldOut({
            category: this.getCurrentCategory(),
            menuId: detail.menuId,
          });
          const newMenuList = this.getCurrentCategoryMenuList().map((menu) =>
            menu.id === detail.menuId ? newMenu : menu
          );
          this.setCurrentCategoryMenuList({ menuList: newMenuList });
        } catch (err) {
          alert(err);
        }
      })
      .on("@updateMenuName", async ({ detail }) => {
        const newMenu = await api.updateMenuName({
          category: this.getCurrentCategory(),
          menuId: detail.menuId,
          newMenuName: detail.newMenuName,
        });
        const newMenuList = this.getCurrentCategoryMenuList().map((menu) =>
          menu.id === detail.menuId ? newMenu : menu
        );
        this.setCurrentCategoryMenuList({ menuList: newMenuList });
      });
  }

  render({ menuList }) {
    this.menuHeadingView.render({
      category: this.currentCategory,
      menuLength: menuList.length,
    });
    this.menuListView.render({ menuList });
  }

  setCurrentCategory({ category }) {
    this.currentCategory = category;
  }

  getCurrentCategory() {
    return this.currentCategory;
  }

  getCurrentCategoryMenuList() {
    return this.store.getMenuList({ category: this.currentCategory });
  }

  setCurrentCategoryMenuList({ menuList }) {
    this.store.setMenuList({ category: this.currentCategory, menuList });
    this.render({ menuList });
  }
}
