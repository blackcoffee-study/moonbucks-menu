import { ERROR_TEXT } from './../constants/index.js';

const BASE_URL = 'http://localhost:3000/api';
const HTTP_METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    };
  },
  DELETE() {
    return {
      method: 'DELETE',
    };
  },
};

const request = async (url, option) => {
  const res = await fetch(url, option);
  if (!res.ok) {
    alert(ERROR_TEXT);
    console.error(res);
  }
  return res.json();
};

const requestWithoutJson = async (url, option) => {
  const res = await fetch(url, option);
  if (!res.ok) {
    alert(ERROR_TEXT);
    console.error(res);
  }
  return res;
};

export const MenuApi = {
  async getAllMenuByCategory(category) {
    return request(`${BASE_URL}/category/${category}/menu`);
  },
  async createMenu(category, name) {
    return request(`${BASE_URL}/category/${category}/menu`, HTTP_METHOD.POST({ name }));
  },
  async updateMenu(category, menuId, name) {
    return request(`${BASE_URL}/category/${category}/menu/${menuId}`, HTTP_METHOD.PUT({ name }));
  },
  async toggleSoldOutMenu(category, menuId) {
    return request(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`, HTTP_METHOD.PUT({ menuId }));
  },
  async removeMenu(category, menuId) {
    return requestWithoutJson(`${BASE_URL}/category/${category}/menu/${menuId}`, HTTP_METHOD.DELETE());
  },
};
