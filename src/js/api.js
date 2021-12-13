const SERVER_URL = "http://localhost:3000/api";
const CATEGORY_API = `${SERVER_URL}/category`;

export async function getMenusByCategory(categoryName) {
  return await fetch(`${CATEGORY_API}/${categoryName}/menu`)
    .then((response) => {
      if (!response.ok) {
        alert(`${response.status}: ${response.statusText}`);
        return;
      }
      console.log("Fetch Menus: ", response);
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function createMenu(categoryName, menuName) {
  return await fetch(`${CATEGORY_API}/${categoryName}/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      name: menuName,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        alert(`${response.status} ${response.statusText}`);
        return;
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function updateMenuName(categoryName, menuId, newMenuName) {
  return await fetch(`${CATEGORY_API}/${categoryName}/menu/${menuId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      name: newMenuName,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        alert(`${response.status} ${response.statusText}`);
        return;
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function deleteMenu(categoryName, menuId, newMenuName) {
  return await fetch(`${CATEGORY_API}/${categoryName}/menu/${menuId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        alert(`${response.status} ${response.statusText}`);
        return;
      }
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function toggleSoldOut(categoryName, menuId) {
  return await fetch(`${CATEGORY_API}/${categoryName}/menu/${menuId}/soldout`, {
    method: "PUT",
  })
    .then((response) => {
      if (!response.ok) {
        alert(`${response.status} ${response.statusText}`);
        return;
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}
