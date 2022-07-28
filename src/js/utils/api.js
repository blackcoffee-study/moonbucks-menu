import { MESSAGE } from "../constants/index.js";

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
    return { method: "DELETE" };
  },
};

const request = async (url, option) => {
  try {
    const res = await fetch(url, option);
    return option && option.method === "DELETE" ? null : await res.json();
  } catch (error) {
    console.log(error.message);
    alert(MESSAGE.ALERT_API);
  }
};

export const MenuAPI = {
  loadMenuAPI(category) {
    return request(`${BASE_URL}/category/${category}/menu`);
  },
  createMenuAPI(name, category) {
    return request(
      `${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name })
    );
  },
  updateMenuAPI(name, category, id) {
    return request(
      `${BASE_URL}/category/${category}/menu/${id}`,
      HTTP_METHOD.PUT({ name })
    );
  },
  soldOutMenuAPI(category, id) {
    return request(
      `${BASE_URL}/category/${category}/menu/${id}/soldout`,
      HTTP_METHOD.PUT()
    );
  },
  deleteMenuAPI(category, id) {
    return request(
      `${BASE_URL}/category/${category}/menu/${id}`,
      HTTP_METHOD.DELETE()
    );
  },
};
