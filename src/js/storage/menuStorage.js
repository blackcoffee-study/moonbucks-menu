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
    return result;
  };
}
