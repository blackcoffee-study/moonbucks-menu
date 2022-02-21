import { ACTION } from '../const/index.js';

const actionCreator = (type) => (payload) => ({
  type,
  payload,
});

// menu

export const addMenu = actionCreator(ACTION.ADD_MENU);

export const addMenus = actionCreator(ACTION.ADD_MENUS);

export const editMenu = actionCreator(ACTION.EDIT_MENU);

export const removeMenu = actionCreator(ACTION.REMOVE_MENU);

export const getMenus = actionCreator(ACTION.GET_MENUS);

// tab

export const addTabs = actionCreator(ACTION.ADD_TABS);

export const getTabs = actionCreator(ACTION.GET_TABS);

export const getCurrentTab = actionCreator(ACTION.GET_CURRENT_TAB);

export const toggleTab = actionCreator(ACTION.TOGGLE_TAB);
