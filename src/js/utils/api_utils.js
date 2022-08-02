let categoryNameState;

export function setApiCategoryName(categoryName) {
  categoryNameState = categoryName;
}

export function getEndPoint() {
  return `http://localhost:3000/api/category/${categoryNameState}/menu`;
}

export async function loadMenuApi() {
  const { data: menus } = await axios.get(getEndPoint());

  if (!menus || menus.length === 0) {
    return {};
  }

  const state = menus.reduce((acc, menu, index) => {
    acc[menu.id] = {
      ...menu,
      index,
    };

    return acc;
  }, {});

  return state;
}

export function addMenuApi(name) {
  return axios.post(getEndPoint(), {
    name,
  });
}

export function removeMenuApi(menuId) {
  return axios.delete(`${getEndPoint()}/${menuId}`);
}

export function soldOutMenuApi(menuId) {
  return axios.put(`${getEndPoint()}/${menuId}/soldout`);
}

export function updateMenuApi(menuId, name) {
  return axios.put(`${getEndPoint()}/${menuId}`, {
    name,
  });
}
