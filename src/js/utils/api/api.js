import { get, put, post, Delete } from '../common/requestMethods.js';
import {
  addMenuAPI,
  BASE_URL,
  deleteMenuAPI,
  getMenuAPI,
  soldoutMenuAPI,
  updateMenuAPI,
} from '../../constants/API_URL.js';

export const fetchMenu = async category => {
  const data = await get(`${BASE_URL}${getMenuAPI(category)}/`);
  return data;
};

export const addMenu = async (category, menuName) => {
  const body = {
    name: menuName,
  };

  const data = await post(`${BASE_URL}${addMenuAPI(category)}/`, body);
  return data;
};

export const toggleSoldOutMenu = async (category, menuId) => {
  const body = {
    category: category,
    id: menuId,
  };

  const data = await put(
    `${BASE_URL}${soldoutMenuAPI(category, menuId)}/`,
    body,
  );
  return data;
};

export const updateMenu = async (category, menuId, updatedName) => {
  const body = {
    category: category,
    id: menuId,
    name: updatedName,
  };

  const data = await put(
    `${BASE_URL}${updateMenuAPI(category, menuId)}/`,
    body,
  );
  return data;
};

export const deleteMenu = async (category, menuId) => {
  await Delete(`${BASE_URL}${deleteMenuAPI(category, menuId)}/`);
};
