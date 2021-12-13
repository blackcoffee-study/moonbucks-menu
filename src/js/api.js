const SERVER_URL = "http://localhost:3000/api";
const CATEGORY_API = `${SERVER_URL}/category`;

function handleResponse(response) {
  if (!response.ok) throw response;
  return response;
}

function handleError(error) {
  error.json().then((body) => {
    alert(body.message);
  });
}

export async function getMenusByCategory(categoryName) {
  return await fetch(`${CATEGORY_API}/${categoryName}/menu`)
    .then(handleResponse)
    .then((response) => response.json())
    .catch(handleError);
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
    .then(handleResponse)
    .then((response) => response.json())
    .catch(handleError);
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
    .then(handleResponse)
    .catch(handleError);
}

export async function deleteMenu(categoryName, menuId, newMenuName) {
  return await fetch(`${CATEGORY_API}/${categoryName}/menu/${menuId}`, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function toggleSoldOut(categoryName, menuId) {
  return await fetch(`${CATEGORY_API}/${categoryName}/menu/${menuId}/soldout`, {
    method: "PUT",
  })
    .then(handleResponse)
    .catch(handleError);
}
