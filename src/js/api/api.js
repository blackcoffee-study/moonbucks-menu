import { MENU_URL } from '../commons/constants.js';

const request = async (url, options) => {
  const response = await fetch(url), {...options};
  if (!response.ok) {
    throw new Error('Error in');
  }
  return response.json();
};

export const getMenus = (category) => request(`${MENU_URL}/${category}/menu`);

export const addMenu = (category, newMenu) => request(`${MENU_URL}`, {
    method: 'POST'
});
