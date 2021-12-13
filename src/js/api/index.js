const BASE_URL = "http://localhost:3000/api";

const getResponse = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    const errorMessage = await response.json().then((data) => data.message);
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  return response;
};

const getResponseWithJson = async (url, option) => {
  const response = await getResponse(url, option);
  return response.json();
};

export const menuApi = {
  addMenu(category, { name }) {
    const url = `${BASE_URL}/category/${category}/menu`;
    const option = {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return getResponseWithJson(url, option);
  },
  getMenu(category) {
    const url = `${BASE_URL}/category/${category}/menu`;
    return getResponseWithJson(url);
  },
  updateMenuName(category, menuId, { name }) {
    const url = `${BASE_URL}/category/${category}/menu/${menuId}`;
    const option = {
      method: "PUT",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return getResponseWithJson(url, option);
  },
  updateMenuSoldOut(category, menuId) {
    const url = `${BASE_URL}/category/${category}/menu/${menuId}/soldout`;
    const option = { method: "PUT" };
    return getResponseWithJson(url, option);
  },
  removeMenu(category, menuId) {
    const url = `${BASE_URL}/category/${category}/menu/${menuId}`;
    const option = { method: "DELETE" };
    return getResponse(url, option);
  },
};
