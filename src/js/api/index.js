const BASE_URL = 'http://localhost:3000/api';

const HTTP_METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    };
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    };
  },
  DELETE() {
    return {
      method: 'DELETE',
    };
  },
};

const MenuApi = {
  async getAllMenuByCategory(category) {
    try {
      const response = await fetch(`${BASE_URL}/category/${category}`);
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    } catch (e) {
      throw new Error(e);
    }
  },
  async createMenuItem(name) {
    try {
      const response = await fetch(`${BASE_URL}/category/${category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    } catch (e) {
      throw new Error(e);
    }
  },
  async updateMenuItem(menuId, name) {
    try {
      const response = await fetch(
        `${BASE_URL}/category/${category}/menu/${menuId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        },
      );
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    } catch (e) {
      throw new Error(e);
    }
  },
  async updateMenuItemIsSoldOut(menuId) {
    try {
      const response = await fetch(
        `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
        {
          method: 'PUT',
        },
      );
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    } catch (e) {
      throw new Error(e);
    }
  },
  async deleteMenuItem(menuId) {
    try {
      const response = await fetch(
        `${BASE_URL}/category/${category}/menu/${menuId}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        throw new Error();
      }
      return response.ok;
    } catch (e) {
      throw new Error(e);
    }
  },
};
