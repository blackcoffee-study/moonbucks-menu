const BASE_URL = "http://localhost:3000/api";

const HTTP_METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },
  PUT(data) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    };
  },
  DELETE() {
    return {
      method: "DELETE",
    };
  },
};

const request = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    alert("에러가 발생했습니다.");
    console.error(e);
  }
  return response.json();
};

const requestWithoutJson = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    alert("에러가 발생했습니다.");
    console.error(e);
  }
  return response;
};

const MenuApi = {
  async getAllMenuByCategory(category) {
    return request(`${BASE_URL}/category/${category}/menu`);
    //this.currentCategory --> category 로 된 이유 & this가 빠진 이유 = 여기서 this는 MenuApi이다. 원래 쓰던 this는 App이었다. // MenuApi는 Category 라는 속성을 않가지고 있기 때문에 못 찾았던 것 이다.
    return response.json();
  },
  async createMenu(category, name) {
    return request(
      `${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name })
    );
  },
  async updateMenu(category, name, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name })
    );
  },
  async toggleSoldOutMenu(category, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT()
    );
  },
  async deleteMenu(category, menuId) {
    return requestWithoutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE()
    );
  },
};

export default MenuApi;
