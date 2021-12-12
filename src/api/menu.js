const baseUrl = 'http://localhost:3000/api/category';

export const getMenuList = async category => {
  try {
    const response = await fetch(`${baseUrl}/${category}/menu`);

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    if (
      response.status === 400 ||
      response.status === 404 ||
      response.status === 500
    ) {
      alert(result.message);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const createMenu = async (category, inputValue) => {
  try {
    const response = await fetch(`${baseUrl}/${category}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputValue,
      }),
    });

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    if (
      response.status === 400 ||
      response.status === 404 ||
      response.status === 500
    ) {
      alert(result.message);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteMenu = async (category, menuId) => {
  try {
    const response = await fetch(`${baseUrl}/${category}/menu/${menuId}`, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      return;
    }

    if (
      response.status === 400 ||
      response.status === 404 ||
      response.status === 500
    ) {
      alert(result.message);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const putMenuName = async (category, menuId, menuName) => {
  try {
    const response = await fetch(`${baseUrl}/${category}/menu/${menuId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: menuName,
      }),
    });

    const result = await response.json();

    if (response.status === 200) {
      return result;
    }

    if (
      response.status === 400 ||
      response.status === 404 ||
      response.status === 500
    ) {
      alert(result.message);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
