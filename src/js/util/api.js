export function Client() {
  const option = {
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  };

  async function get(url, options) {
    const result = await fetch(
      url,
      Object.assign(option, options, { method: "GET" })
    );

    return result.json();
  }

  async function post(url, data = {}) {
    const result = await fetch(
      url,
      Object.assign(
        option,
        {
          body: JSON.stringify(data),
        },
        { method: "POST" }
      )
    );

    return result.json();
  }

  async function put(url, data = {}) {
    const result = await fetch(
      url,
      Object.assign(
        option,
        {
          body: JSON.stringify(data),
        },
        { method: "PUT" }
      )
    );
    return result.json();
  }

  async function del(url, data = {}) {
    return await fetch(
      url,
      Object.assign(
        option,
        {
          body: JSON.stringify(data),
        },
        { method: "DELETE" }
      )
    );
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
