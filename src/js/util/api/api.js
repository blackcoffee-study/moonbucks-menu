const SERVER_URL = "http://localhost:3001";

const api = {
  get: async (url) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/category${url ? url : ""}`);

      if (!res) {
        throw new Error("서버 에러");
      }

      return await res.json();
    } catch (e) {
      throw new Error(e);
    }
  },
  post: async (url, data) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/category${url ? url : ""}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      return await res.json();
    } catch (e) {
      return e;
    }
  },
  put: async (url, data) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/category${url ? url : ""}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      return await res.json();
    } catch (e) {
      return e;
    }
  },
  delete: async (url) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/category${url ? url : ""}`, {
        method: "DELETE",
      });

      if (!res) {
        throw new Error("서버 에러");
      }

      return await res.json();
    } catch (e) {
      return e;
    }
  },
};

export default api;
