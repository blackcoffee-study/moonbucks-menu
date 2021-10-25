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

export const requestApi = async function (optionObj, url) {
  try {
    const response = await fetch(
      `${CONSTANT.BASE_URL}${url}`,
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
