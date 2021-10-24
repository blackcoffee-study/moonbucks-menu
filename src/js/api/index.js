export const BASE_URL = 'http://localhost:3000';

export const postMenu = async function (url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const { message: errorMessage } = await response.json();
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (err) {
    alert(err);
  }
};

export const getMenu = async function (url) {
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      const { message: errorMessage } = await response.json();
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (err) {
    alert(err);
  }
};

export const putMenu = async function (url, data) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const { message: errorMessage } = await response.json();
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (err) {
    alert(err);
  }
};

export const deleteMenu = async function (url) {
  try {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
      const { message: errorMessage } = await response.json();
      throw new Error(errorMessage);
    }
  } catch (err) {
    alert(err);
  }
};
