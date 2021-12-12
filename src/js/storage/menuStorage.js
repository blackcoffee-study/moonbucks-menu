export default class MenuStorage {
  baseUrl = "http://localhost:3000";

  constructor(category) {
    this.category = category;
    this.datas = [];
  }

  getCategory = () => {
    return this.category;
  };

  fetchAll = async () => {
    const url = `${this.baseUrl}/api/category/${this.category}/menu`;
    const response = await fetch(url);
    const result = await response.json();
    this.datas = result;
    return result;
  };

  remove = async (id, name) => {
    const url = `${this.baseUrl}/api/category/${this.category}/menu/${id}`;
    const response = await fetch(url, {
      method: "delete",
      body: JSON.stringify({
        name: name,
      }),
    }).then(this._removeData(id));
    const result = await response.text();
    return result;
  };

  editMenuName = async (id, name) => {
    const url = `${this.baseUrl}/api/category/${this.category}/menu/${id}`;
    const response = await fetch(url, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
      }),
    });
    const result = await response.json();
    this._editNameData(result);
    return result;
  };

  soldOut = async (id, name) => {
    const url = `${this.baseUrl}/api/category/${this.category}/menu/${id}/soldout`;
    const response = await fetch(url, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
      }),
    });
    const result = await response.json();
    this._soldOutData(result);
    return result;
  };

  add = async (name) => {
    const url = `${this.baseUrl}/api/category/${this.category}/menu`;
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
      }),
    });
    const result = await response.json();
    this._addData(result);
    return result;
  };

  // Private functions
  _addData = (addedMenu) => {
    const updatedDatas = [...this.datas, addedMenu];
    this.datas = updatedDatas;
  };

  _editNameData = (menu) => {
    const menuIdx = this.datas.findIndex((m) => m.id === menu.id);
    this.datas[menuIdx] = menu;
  };

  _removeData = (id) => {
    const updatedDatas = this.datas.filter((menu) => menu.id !== id);
    this.datas = updatedDatas;
  };

  _soldOutData = (menu) => {
    const menuIdx = this.datas.findIndex((m) => m.id === menu.id);
    this.datas[menuIdx].isSoldOut = menu.isSoldOut;
  };
}
