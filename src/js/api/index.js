const BASE_URL = "http://localhost:3000/api";
const MenuApi = {
  async getAllMenuByCategory(category) {
    const response = await fetch(
      //this.currentCategory --> category 로 된 이유 & this가 빠진 이유 = 여기서 this는 MenuApi이다. 원래 쓰던 this는 App이었다. // MenuApi는 Category 라는 속성을 않가지고 있기 때문에 못 찾았던 것 이다.
      `${BASE_URL}/category/${category}/menu`
    );
    return response.json();
  },
  async createMenu(category, name) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      console.error("에러가 발생했습니다.");
    }
  },
  async updateMenu(category, name, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        // 생성할 때는 POST 수정할 때 는 PUT
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!response.ok) {
      console.error("에러가 발생했습니다.");
    }
    return response.json();
  },
  async toggleSoldOutMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      {
        method: "PUT",
      }
    );
    if (!response.ok) {
      console.error("에러가 발생했습니다.");
    }
  },
  async deleteMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      console.error("에러가 발생했습니다.");
    }
  },
};

export default MenuApi;
