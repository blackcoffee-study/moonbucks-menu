const BASE_URL = "http://localhost:3000/api";

export const MenuAPI = {
  async loadMenuAPI(category) {
    const res = await fetch(`${BASE_URL}/category/${category}/menu`);
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
    if (!res.ok) {
      alert("에러가 발생했습니다.");
    }
  },
};
