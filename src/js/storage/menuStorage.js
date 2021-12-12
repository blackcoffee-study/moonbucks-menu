export default class MenuStorage {
  baseUrl = "http://localhost:3000";

  constructor(category) {
    this.category = category;
  }

  getCategory = () => {
    return this.category;
  };

  fetchAll = async () => {
    const url = `${this.baseUrl}/api/category/${this.category}/menu`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  };

  remove = async (id, name) => {
    const url = `${this.baseUrl}/api/category/${this.category}/menu/${id}`;
    const response = await fetch(url, {
      method: "delete",
      body: JSON.stringify({
        name: name,
      }),
    });
    const result = await response.text();
    return result;
  };

  // error: 수정은 서버에서 OK 뜨고 서버에서 결과값을 던져줌.
  // 하지만, 수정된 name 필드가 삭제됨
  //{{baseUrl}}/api/category/:category/menu/:menuId
  editMenuName = async (id, name) => {
    console.log("name == ", name);
    const url = `${this.baseUrl}/api/category/${this.category}/menu/${id}`;
    const response = await fetch(url, {
      method: "put",
      body: JSON.stringify({
        name: name,
      }),
    });
    const result = await response.json();
    return result;
  };

  soldOut = async (id, name) => {
    console.log("soldout name == ", name);
    const url = `${this.baseUrl}/api/category/${this.category}/menu/${id}/soldout`;
    const response = await fetch(url, {
      method: "put",
      body: JSON.stringify({
        name: name,
      }),
    });
    const result = await response.json();
    return result;
  };

  add = (menuName) => {
    const menuData = {
      id: this.datas.length == 0 ? 0 : this.datas[this.datas.length - 1].id + 1,
      menuName: menuName,
      soldOut: false,
    };
    const updatedDatas = [...this.datas, menuData];
    this.storage.setItem(this.category, JSON.stringify(updatedDatas));
    this.datas = updatedDatas;
    return menuData;
  };
}
