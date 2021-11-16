const BASE_URL = 'http://localhost:3000';

export default {
  postMenu: (currentCategoryName, menuName) => {
    const url = `${BASE_URL}/api/category/${currentCategoryName}/menu`;
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: menuName }),
    })
      .then(data => {
        if (!data.ok) {
          alert('400!');
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  getMenuList: currentCategoryName => {
    const url = `${BASE_URL}/api/category/${currentCategoryName}/menu`;
    return fetch(url).then(data => data.json());
  },

  updateMenu: (currentCategoryName, id, newMenuName) => {
    const url = `${BASE_URL}/api/category/${currentCategoryName}/menu/${id}`;
    return fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newMenuName }),
    }).then(data => data.json());
  },

  updateSoldout: (currentCategoryName, id) => {
    const url = `${BASE_URL}/api/category/${currentCategoryName}/menu/${id}/soldout`;
    return fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }).then(data => data.json());
  },

  deleteMenu: (currentCategoryName, id) => {
    const url = `${BASE_URL}/api/category/${currentCategoryName}/menu/${id}`;
    return fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(data => data);
  },
};
