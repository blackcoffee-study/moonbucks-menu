import createStore from './store/config.js';
import { ADD_MENU_ITEM, DELETE_MENU_ITEM, LOAD_MENU_LIST, UPDATE_CATEGORY, UPDATE_MENU_ITEM, UPDATE_MENU_SOLDOUT } from './common/constants.js';
import { categoryRender, menuRender } from './common/utils/render.js';
import { updateLocalStorage } from './common/utils/localStorage.js';

const initialState = {
  category: 'espresso',
  menuList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: action.data.categoryName,
        menuList: action.data.menuList || [],
      };
    case LOAD_MENU_LIST:
      return {
        ...state,
        menuList: action.data,
      };
    case ADD_MENU_ITEM:
      return {
        ...state,
        menuList: [ ...state.menuList, action.data ],
      };
    case UPDATE_MENU_ITEM:
      return {
        ...state,
        menuList: state.menuList.map((menu) => menu.id === action.data.id ? { ...menu, ...action.data } : menu),
      };
    case DELETE_MENU_ITEM:
      return {
        ...state,
        menuList: state.menuList.filter((menu) => menu.id !== action.data),
      };
    case UPDATE_MENU_SOLDOUT:
      return {
        ...state,
        menuList: state.menuList.map((menu) => menu.id === action.data ? { ...menu, soldout: !menu.soldout } : menu),
      };
    default:
      return state;
  }
}

const store = createStore(initialState, (reducer));

store.subscribe(updateLocalStorage);
store.subscribe(menuRender);

export default store;
