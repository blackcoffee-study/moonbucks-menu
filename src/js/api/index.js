import * as CONSTANT from '../constants/index.js';

const options = function (optionObj) {
  const { method, ...data } = optionObj;
  if (method === CONSTANT.METHOD_POST || method === CONSTANT.METHOD_PUT) {
    return {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  }

  return { method };
};

const requestApi = async function (optionObj, category, uri = '') {
  try {
    const response = await fetch(
      `${CONSTANT.BASE_URL}/api/category/${category}/menu${uri}`,
      options(optionObj)
    );
    if (!response.ok) {
      const { message: errorMessage } = await response.json();
      throw new Error(errorMessage);
    }

    if (optionObj['method'] === CONSTANT.METHOD_DELETE) return;

    return response.json();
  } catch (err) {
    alert(err);
  }
};

export const httpMethod = {
  createMenu: (menu, category) =>
    requestApi({ method: CONSTANT.METHOD_POST, name: menu }, category),

  getMenu: category => requestApi({ method: CONSTANT.METHOD_GET }, category),

  editMenu: (menu, category, menuId) =>
    requestApi(
      { method: CONSTANT.METHOD_PUT, name: menu },
      category,
      `/${menuId}`
    ),

  soldOutMenu: (category, soldOut, menuId) =>
    requestApi(
      { method: CONSTANT.METHOD_PUT, isSoldOut: soldOut },
      category,
      `/${menuId}/soldout`
    ),

  removeMenu: (category, menuId) =>
    requestApi({ method: CONSTANT.METHOD_DELETE }, category, `/${menuId}`)
};
