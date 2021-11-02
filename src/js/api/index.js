const BASE_URL = "http://localhost:3000";

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
      body: data ? JSON.stringify(data) : "",
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
    alert("에러 발생");
    return;
  }
  if (!option || option.method !== "DELETE") {
    return response.json();
  }
};

const ApiMethod = {
  async getAllMenuItemsFromServer(categoryName) {
    return request(`${BASE_URL}/api/category/${categoryName}/menu`);
  },
  async postMenuItemToServer(categoryName, menuItemName) {
    return request(
      `${BASE_URL}/api/category/${categoryName}/menu`,
      HTTP_METHOD.POST({ name: menuItemName })
    );
  },
  async putMenuItemNameToServer(categoryName, id, inputMenuItemName) {
    return request(
      `${BASE_URL}/api/category/${categoryName}/menu/${id}`,
      HTTP_METHOD.PUT({ name: inputMenuItemName })
    );
  },
  async putMenuItemSoldoutToServer(categoryName, id) {
    return request(
      `${BASE_URL}/api/category/${categoryName}/menu/${id}/soldout`,
      HTTP_METHOD.PUT()
    );
  },
  async deleteMenuItemToServer(categoryName, id) {
    return request(
      `${BASE_URL}/api/category/${categoryName}/menu/${id}`,
      HTTP_METHOD.DELETE()
    );
  },
};

export default ApiMethod;
