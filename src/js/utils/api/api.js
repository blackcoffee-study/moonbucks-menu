import { get, put, post } from '../common/requestMethods.js';
import {
  addMenuAPI,
  BASE_URL,
  getMenuAPI,
  soldoutMenuAPI,
} from '../../constants/API_URL.js';

export const fetchMenu = async category => {
  const data = await get(`${BASE_URL}${getMenuAPI(category)}/`);
  console.log('allData: ', data);
  return data;
};

export const addMenu = async (category, menuName) => {
  const body = {
    name: menuName,
  };

  const data = await post(`${BASE_URL}${addMenuAPI(category)}/`, body);
  console.log('add: ', data);
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
  console.log('soldout: ', data);
  return data;
};
