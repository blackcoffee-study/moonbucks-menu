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
    console.error(response, "에러 로그");
  }
  return response.json();
};

const requestWithOutJson = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    alert("에러가 발생했습니다.");
    console.error(response, "에러 로그");
  }
  return response;
};

const MenuApi = {
  // 메뉴 리스트 불러오기
  async getAllMenuByCategory(category) {
    // 변수로 response를 선언하면 then으로 데이터 체이닝을 해주지 않아도 response 객체를 받아 올 수 있다.
    // const response = await fetch(`${BASE_URL}/category/${category}/menu`);
    // return response.json();

    // .then((response) => {
    //   return response.json();
    // })
    // .then((data) => {
    //   return data;
    // });

    return request(`${BASE_URL}/category/${category}/menu`);
  },

  // 메뉴 등록
  async createMenu(category, name) {
    return request(
      `${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name })
    );
    // const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name }),
    // });
    // if (!response.ok) {
    //   console.error(response, "에러 로그");
    // }
  },

  // 메뉴 수정
  async updateMenu(category, name, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name })
    );
  },

  // 메뉴 품절 토글 처리
  async toggleSoldOutMenu(category, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT()
    );
  },

  // 메뉴 삭제
  async deleteMenu(category, menuId) {
    return requestWithOutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE()
    );
  },
};

export default MenuApi;
