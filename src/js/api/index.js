const BASE_URL = 'http://localhost:4000/api'

const instance = async (method, url = '/', payload = '') => {
  const option = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (payload) {
    option.body = JSON.stringify(payload)
  }

  try {
    const response = await fetch(BASE_URL + url, option)

    if (response.ok) {
      if(method === HTTP_METHOD.DELETE) return;
      return await response.json()
    }

    return []
  } catch (err) {
    console.error(err)
  }
}

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

const requests = {
  get: (url) => instance(HTTP_METHOD.GET, url),
  post: (url, body = {}) => instance(HTTP_METHOD.POST, url, body),
  put: (url, body = {}) => instance(HTTP_METHOD.PUT, url, body),
  delete: (url) => instance(HTTP_METHOD.DELETE, url)
}

export const menuAPI = {
  getCurrentMenu: (category = 'espresso') => requests.get(`/category/${category}/menu`),
  addCafeMenu: (category, name) => requests.post(`/category/${category}/menu`, { name }),
  updateMenuName: (category, menuId, name) => requests.put(`/category/${category}/menu/${menuId}`, { name }),
  soldOutMenu: (category, menuId) => requests.put(`/category/${category}/menu/${menuId}/soldout`),
  deleteMenu: (category, menuId) => requests.delete(`/category/${category}/menu/${menuId}`)
}
