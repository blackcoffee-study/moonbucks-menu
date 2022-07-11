const BASE_URL = 'http://localhost:3000';

const INIT = {
  POST(name) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    };
  },
  PUT(name) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: name ? JSON.stringify({ name }) : null,
    };
  },
  DELETE() {
    return {
      method: 'DELETE',
    };
  },
};

const request = async (resource, init) => {
  try {
    const res = await fetch(resource, init);

    if (!res.ok) alert('서버와의 통신이 실패하였습니다.');

    if (init && init.method === 'DELETE') return;

    return await res.json();
  } catch (error) {
    alert('서버와의 통신이 실패하였습니다.', error.message);
  }
};

export const menuApi = {
  getMenuListByCategory(category) {
    return request(`${BASE_URL}/api/category/${category}/menu`);
  },
  addMenu(category, menuName) {
    return request(`${BASE_URL}/api/category/${category}/menu`, INIT.POST(menuName));
  },
  updateMenu(category, menuId, menuName) {
    return request(`${BASE_URL}/api/category/${category}/menu/${menuId}`, INIT.PUT(menuName));
  },
  toggleSoldOut(category, menuId) {
    return request(`${BASE_URL}/api/category/${category}/menu/${menuId}/soldout`, INIT.PUT());
  },
  deleteMenu(category, menuId) {
    return request(`${BASE_URL}/api/category/${category}/menu/${menuId}`, INIT.DELETE());
  },
};
