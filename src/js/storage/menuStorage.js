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
    const arr = JSON.parse(this.storage.getItem(this.key));
    const updatedArr = arr.filter((menu) => menu.id != id);
    this.storage.setItem(this.key, JSON.stringify(updatedArr));
    this.datas = updatedArr;
    console.log(JSON.parse(this.storage.getItem(this.key)));
  };

  add(menuName) {
    const arr = JSON.parse(this.storage.getItem(this.key)) || [];
    const menuData = {
      id: arr.length == 0 ? 0 : arr[arr.length - 1].id + 1,
      menuName: menuName,
      soldOut: false,
    };
    const updatedArr = [...arr, menuData];
    this.datas = updatedArr;
    this.storage.setItem(this.key, JSON.stringify(updatedArr));
    console.log(JSON.parse(this.storage.getItem(this.key)));
  }
}
