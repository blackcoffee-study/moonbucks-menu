const BASE_URL = 'http://localhost:3000';

const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    if (!response.ok) {
      throw response.json();
    }
    return await (option.method !== 'DELETE' ? response.json() : {});
  } catch (err) {
    err.then(e => {
      alert(e.message);
    })

  }
};

export const getData = async (category) =>
  request(`${BASE_URL}/api/category/${category}/menu`, { method: 'GET' })

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

export const soldOutData = async (category, menuId) =>
  request(`${BASE_URL}/api/category/${category}/menu/${menuId}/soldout`, {
    method: 'PUT',
  })