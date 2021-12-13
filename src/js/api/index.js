const BASE_URL = "http://localhost:3000/api";

export const menuApi = {
  async addMenu(category, name) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json().then((data) => data.message);
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    return response.json();
  },
  async getMenu(category) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`);

    if (!response.ok) {
      const errorMessage = await response.json().then((data) => data.message);
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    return response.json();
  },
  async updateMenuName() {},
  async updateMenuSoldOut() {},
  async removeMenu() {},
};
