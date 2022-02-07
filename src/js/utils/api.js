const BASE_URL = 'http://localhost:3000'

export const request = async(url, methods, data) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: methods, 
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    if(res.ok) {
      const result = await res.json()
      return result
    } else {
      throw new Error(`잘못 되었습니다. status code: ${res.status}`)
    }
  } catch(e) {
    throw new Error(`서버 통신 중 에러 발생 : ${BASE_URL}${url}`)
  }
}

export const requestDelete = async(url, methods) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: methods, 
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    })
    if(!res.ok) {
      throw new Error(`잘못 되었습니다. status code: ${res.status}`)
    }
  } catch(e) {
    throw new Error(`서버 통신 중 에러 발생 : ${BASE_URL}${url}`)
  }
}

const API_URL = {
  CATEGORY: `/api/category`,
  CATEGORY_MENU: (CATEGORY_NAME) =>  `/api/category/${CATEGORY_NAME}/menu`,
  CATEGORY_MENU_MODIFY: (CATEGORY_NAME, CATEGORY_MENU_ID) => `/api/category/${CATEGORY_NAME}/menu/${CATEGORY_MENU_ID}`,
  CATEGORY_MENU_SOLDOUT: (CATEGORY_NAME, CATEGORY_MENU_ID) => `/api/category/${CATEGORY_NAME}/menu/${CATEGORY_MENU_ID}/soldout`
}

const METHOD = {
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT'
}

export const getCategory = async() => await(API_URL.CATEGORY)
export const getCategoryMenu = async(categoryName) => {
  return await request(API_URL.CATEGORY_MENU(categoryName))
}
export const postCreateMenu = async(categoryName, menuName) => {
  return await request(API_URL.CATEGORY_MENU(categoryName), METHOD.POST, {name: menuName})
}
export const deleteMenu = async(categoryName, menuId) => {
  return await requestDelete(API_URL.CATEGORY_MENU_MODIFY(categoryName, menuId), METHOD.DELETE)
}
export const putModifyMenu = async(categoryName, menuId, menuName) => {
  return await request(API_URL.CATEGORY_MENU_MODIFY(categoryName, menuId), METHOD.PUT, {name: menuName})
}
export const putSoldOutMenu = async(categoryName, categoryMenuId) => {
  return await request(API_URL.CATEGORY_MENU_SOLDOUT(categoryName, categoryMenuId), METHOD.PUT)
}