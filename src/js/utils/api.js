import { MESSAGE } from "../constants/index.js";

const BASE_URL = "http://localhost:3000/api";

export const MenuAPI = {
  async loadMenuAPI(category) {
    const res = await fetch(`${BASE_URL}/category/${category}/menu`);
    if (!res.ok) alert(MESSAGE.ALERT_API);
    return res.json();
  },
  async createMenuAPI(name, category) {
    const res = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) alert(MESSAGE.ALERT_API);
  },
  async updateMenuAPI(name, category, id) {
    const res = await fetch(`${BASE_URL}/category/${category}/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) alert(MESSAGE.ALERT_API);
  },
};
