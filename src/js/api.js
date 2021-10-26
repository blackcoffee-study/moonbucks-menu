const BASE_URL = 'http://localhost:3000';

const request = async (url, option = { method: 'GET' }) => {
  try {
    const response = await fetch(url, option);
    const result = await response.json().catch(() => []);
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (err) {
    alert(err.message);
  }
};

export const getData = async (category) =>
  request(`${BASE_URL}/api/category/${category}/menu`)

export const postData = async (category, name) =>
  request(`${BASE_URL}/api/category/${category}/menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    })
  })

export const editData = async (category, menuId, name) =>
  request(`${BASE_URL}/api/category/${category}/menu/${menuId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    })
  })

export const deleteData = async (category, menuId) =>
  request(`${BASE_URL}/api/category/${category}/menu/${menuId}`, {
    method: 'DELETE'
  })


