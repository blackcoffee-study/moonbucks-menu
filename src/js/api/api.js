import { MENU_URL } from '../commons/constants.js';

const request = async (url, options) => {
  const response = await fetch(url, { ...options });
  if (!response.ok) {
    throw new Error('Error');
  }
  return response.json();
};

export const getMenuData = (category) =>
  request(`${MENU_URL}/${category}/menu`);

export const addMenuData = (category, newMenu) =>
  request(`${MENU_URL}/${category}/menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newMenu,
    }),
  });
