import { get } from '../common/request.js';
import { BASE_URL, getMenuAPI } from '../../constants/api.js';

export const fetchMenu = async category => {
  const data = await get(`${BASE_URL}${getMenuAPI(category)}/`);
  return data;
};
