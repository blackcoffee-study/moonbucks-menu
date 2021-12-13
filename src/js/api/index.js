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
  async updateMenuName(category, menuId, name) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.json().then((data) => data.message);
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    return response.json();
  },
  async updateMenuSoldOut(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      const errorMessage = await response.json().then((data) => data.message);
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    return response.json();
  },
  async removeMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorMessage = await response.json().then((data) => data.message);
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    return response;
  },
};
