export default class MenuStorage {
  constructor(storageKey) {
    this.storage = window.localStorage;
    this.key = storageKey;
    this.fetchAll();
  }

  fetchAll = () => {
    const fetchDatas = JSON.parse(this.storage.getItem(this.key));
    if (fetchDatas) {
      this.datas = fetchDatas;
    } else {
      this.datas = [];
    }
    return this.datas;
  };

  removeById = (id) => {
    const updatedDatas = this.datas.filter((menu) => menu.id != id);
    this.storage.setItem(this.key, JSON.stringify(updatedDatas));
    this.datas = updatedDatas;
  };

  soldOutById = (id) => {
    const menu = this.datas.find((m) => m.id == id);
    const menuIdx = this.datas.findIndex((m) => m.id == id);
    if (menu) {
      menu.soldOut = !menu.soldOut;
      this.datas[menuIdx] = menu;
      this.storage.setItem(this.key, JSON.stringify(this.datas));
    }
  };

  editMenuName = (id, name) => {
    const menu = this.datas.find((m) => m.id == id);
    const menuIdx = this.datas.findIndex((m) => m.id == id);
    if (menu) {
      menu.menuName = name;
      this.datas[menuIdx] = menu;
      this.storage.setItem(this.key, JSON.stringify(this.datas));
    }
  };

  add(menuName) {
    const menuData = {
      id: this.datas.length == 0 ? 0 : this.datas[this.datas.length - 1].id + 1,
      menuName: menuName,
      soldOut: false,
    };
    const updatedDatas = [...this.datas, menuData];
    this.storage.setItem(this.key, JSON.stringify(updatedDatas));
    this.datas = updatedDatas;
    return menuData;
  }
}
