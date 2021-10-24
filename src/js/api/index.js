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
    if (!response.ok) throw new Error();

    return response.json();
  } catch (err) {
    alert(err.message);
  }
};

export const getMenu = async function (url) {
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) throw new Error();

    return response.json();
  } catch (err) {
    alert(err.message);
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
    console.log(response);
    if (!response.ok) throw new Error();

    return response.json();
  } catch (err) {
    alert(err);
  }
};

export const deleteMenu = async function (url) {
  try {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) throw new Error();
  } catch (err) {
    alert(err);
  }
};
