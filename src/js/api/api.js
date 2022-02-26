import { MENU_URL } from '../commons/constants.js';

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error in');
    }
    return await response.json();
  } catch (e) {
    alert(e.message);
  }
};

export const getMenus = (category) => {
  request(`${MENU_URL}/${category}/menu`);
};
