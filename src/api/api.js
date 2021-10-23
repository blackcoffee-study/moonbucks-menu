const API_ENDPOINT = 'http://localhost:3000';

const options = {
  post: (content) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  }),
  delete: () => ({
    method: 'DELETE',
  }),
  put: () => ({
    method: 'PUT',
  }),
};

const request = async (url, option = {}) => {
  const response = await fetch(url, option);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.status);
  }
};

export const api = {
  addMenu: (category) => {
    return request(
      `${API_ENDPOINT}/api/category/${category}/menu`,
      options.post(content)
    );
  },
  getMenu: (category) => {
    return request(`${API_ENDPOINT}/api/category/${category}/menu`);
  },
  editMenuName: (category, menuId) => {
    return request(
      `${API_ENDPOINT}/api/category/${category}/menu/${menuId}`,
      options.put()
    );
  },
  soldoutMenu: (category, menuId) => {
    return request(
      `${API_ENDPOINT}/api/category/${category}/menu/${menuId}/soldout`,
      options.put()
    );
  },
  deleteMenu: (category, menuId) => {
    return request(
      `${API_ENDPOINT}/api/category/${category}/menu/${menuId}`,
      options.delete()
    );
  },
};
