import { CATEGORY, CATEGORY_LABEL } from '../../const/index.js';
import localStorage from '../index.js';
import { head, isEmpty } from '../../utils/index.js';

/**
 * interface Menu {
 *  id: string;
 *  menu: string;
 * }
 *
 * interface Tab {
 *  name: keyof typeof CATEGORY;
 *  label: string;
 * }
 *
 * interface Request {
 *  pathParams: {
 *    categoryName: keyof typeof CATEGORY;
 *  };
 *  queryString?: {
 *    id: string;
 *  };
 *  data?: Menu;
 * }
 *
 * interface Response<DataType> {
 *  tag: keyof typeof CATEGOFY;
 *  data: DataType
 * }
 */

/**
 *
 * @returns {Response<Tab[]>}
 */
export const postTabs = () => {
  const data = Object.entries(CATEGORY_LABEL).map(([name, label]) => ({
    name,
    label,
  }));
  return localStorage.set('tabs', data);
};

/**
 *
 * @returns {Response<Tab[]>}
 */
export const getTabs = () => {
  const result = localStorage.get('tabs');

  if (isEmpty(result.data)) {
    postTabs();
    result.data = localStorage.get('tabs').data;
  }

  return result;
};

/**
 *
 * @param {data: Tab} data
 * @returns {Response<Tab>}
 */
export const postCurrentTab = (data) => {
  localStorage.removeTab();
  return localStorage.set('currentTab', data);
};

/**
 *
 * @returns {Response<Tab>}
 */
export const getCurrentTab = () => {
  const result = localStorage.get('currentTab');
  if (!isEmpty(result.data)) {
    return head(result.data);
  }

  const initialTab = {
    name: CATEGORY.ESPRESSO,
    label: CATEGORY_LABEL[CATEGORY.ESPRESSO],
  };

  postCurrentTab([initialTab]);
  return getCurrentTab();
};

/**
 *
 * @param {Request} request
 * @returns {Response<Menu[]>}
 */
export const postMenu = ({ pathParams, data }) => {
  return localStorage.set(pathParams.categoryName, data);
};

/**
 *
 * @param {Request} request
 * @returns {Response<Menu[]>}
 */
export const putMenu = ({ pathParams, data }) => {
  return localStorage.edit(pathParams.categoryName, data);
};

/**
 *
 * @param {Request} request (only pathParams)
 * @returns {Response<Menu[]>}
 */
export const getMenusByCategory = ({ pathParams }) => {
  return localStorage.get(pathParams.categoryName);
};

export const getMenus = ({ pathParams }) => {
  return pathParams.categoryName.split(',').map(localStorage.get);
};

/**
 *
 * @param {Request} request (pathParams and queryString)
 * @returns {Response<string>}
 */
export const deleteMenuById = ({ pathParams, queryString }) => {
  return localStorage.removeItem(pathParams.categoryName, queryString);
};
