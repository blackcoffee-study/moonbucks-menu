const API_ENDPOINT = `http://localhost:3000`;

export const getMenuList = async ({ category }) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/category/${category}/menu`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const postMenu = async ({ category, menuName }) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/category/${category}/menu`,
      {
        method: "POST",
        body: JSON.stringify({ name: menuName }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteMenu = async ({ category, menuId }) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/category/${category}/menu/${menuId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateMenuName = async ({ category, menuId, newMenuName }) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/category/${category}/menu/${menuId}`,
      {
        method: "PUT",
        body: JSON.stringify({ name: newMenuName }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    console.log(response.json);
    return await response.json();
  } catch (err) {
    throw new Error("에러가 났습니다");
  }
};

export const updateMenuSoldOut = async ({ category, menuId }) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/api/category/${category}/menu/${menuId}/soldout`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};
