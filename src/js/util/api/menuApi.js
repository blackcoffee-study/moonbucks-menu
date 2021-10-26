import api from "./api.js";

const menuApi = {
  addMenu: async (category, $target) => {
    try {
      const res = await api.post(`/${category}/menu`, {
        name: $target.value,
      });

      if (res.message) {
        alert(res.message);
      }

      $target.value = "";
      return res;
    } catch (e) {
      alert(e);
    }
  },
  getMenu: async (category) => {
    try {
      const res = await api.get(`/${category}/menu`);
      return res;
    } catch (e) {
      alert(e.message);
      return false;
    }
  },
  soldOutMenu: async (category, menuId) => {
    try {
      const res = await api.put(`/${category}/menu/${menuId}/soldout`);
      return res;
    } catch (e) {
      alert(e.message);
    }
  },
  editMenu: async (category, menuId, result) => {
    try {
      const res = await api.put(`/${category}/menu/${menuId}`, {
        name: result,
      });
    } catch (e) {
      alert(e.message);
    }
  },
  deleteMenu: async (category, menuId) => {
    try {
      await api.delete(`/${category}/menu/${menuId}`);
    } catch (e) {
      alert(e.message);
    }
  },
};

export default menuApi;
