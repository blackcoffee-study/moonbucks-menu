const BASE_URL = 'http://localhost:3000/api'

const ERRORMESSAGE = '에러가 발생했습니다.'

const HTTP_METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data && JSON.stringify(data),
    }
  },
  DELETE() {
    return {
      method: 'DELETE',
    }
  },
}

const request = async (url, option) => {
  try {
    const response = await fetch(url, option)
    if (!response.ok) {
      alert(ERRORMESSAGE)
      throw new Error(ERRORMESSAGE)
    }

    return response.json()
  } catch (e) {
    console.error(e)
  }
}

const requestWithoutJson = async (url, option) => {
  try {
    const response = await fetch(url, option)
    if (!response.ok) {
      alert(ERRORMESSAGE)
      throw new Error(ERRORMESSAGE)
    }

    return response
  } catch (e) {
    console.error(e)
  }
}

const MenuApi = {
  async getAllMenuByCategory(category) {
    return request(`${BASE_URL}/category/${category}/menu`)
  },
  async createMenu(category, name) {
    return request(
      `${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name })
    )
  },
  async updateMenu(category, name, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name })
    )
  },
  async toggleSoldOutMenu(category, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT()
    )
  },
  async deleteMenu(category, menuId) {
    return requestWithoutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE()
    )
  },
}

export default MenuApi
