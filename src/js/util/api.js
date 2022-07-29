export function Client() {
  const option = {
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const baseOption = (data) =>
    Object.assign(option, { body: JSON.stringify(data) });

  async function get(url, options = {}) {
    const params = Object.assign(option, options, { method: "GET" });
    const result = await fetch(url, params);
    return result.json();
  }

  async function post(url, data = {}) {
    const params = Object.assign(baseOption(data), { method: "POST" });
    const result = await fetch(url, params);
    return result.json();
  }

  async function put(url, data = {}) {
    const params = Object.assign(baseOption(data), { method: "PUT" });
    const result = await fetch(url, params);
    return result.json();
  }

  async function del(url, data = {}) {
    const params = Object.assign(baseOption(data), { method: "DELETE" });
    return await fetch(url, params);
  }

  return { get, post, put, del };
}

export function Api(client) {
  const API_HOST = "http://localhost:4000/api";

  const apiUrl = (categoryName, suffix = "") =>
    `${API_HOST}/category/${categoryName}/menu${suffix}`;

  function response(result) {
    if (result.message) {
      throw new Error(result.message);
    }

    return result;
  }

  async function createMenu({ categoryName, name }) {
    const url = apiUrl(categoryName);
    return response(await client.post(url, { name }));
  }

  async function getMenu({ categoryName }) {
    const url = apiUrl(categoryName);
    return response(await client.get(url, { name }));
  }

  async function editMenu({ categoryName, menuId, name }) {
    const url = apiUrl(categoryName, `/${menuId}`);
    return response(await client.put(url, { name }));
  }

  async function soldOut({ categoryName, menuId }) {
    const url = apiUrl(categoryName, `/${menuId}/soldout`);
    return response(await client.put(url));
  }

  async function delMenu({ categoryName, menuId }) {
    const url = apiUrl(categoryName, `/${menuId}`);
    return response(await client.del(url));
  }

  return { createMenu, getMenu, editMenu, soldOut, delMenu };
}
