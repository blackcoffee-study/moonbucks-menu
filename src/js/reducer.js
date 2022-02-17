import createStore from './store/config.js';

const initialState = {
  category: 'espresso',
  menuList: [],
};

export const UPDATE_CAFE_CATEGORY = 'UPDATE_CAFE_CATEGORY';

export const LOAD_MENU_ITEM = 'LOAD_MENU_ITEM';
export const ADD_MENU_ITEM = 'ADD_MENU_ITEM';
export const UPDATE_MENU_ITEM = 'UPDATE_MENU_ITEM';
export const DELETE_MENU_ITEM = 'DELETE_MENU_ITEM';

export const UPDATE_MENU_SOLDOUT = 'UPDATE_MENU_SOLDOUT';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CAFE_CATEGORY:
      return {
        ...state,
        category: action.data.categoryName,
        menuList: action.data.menuList || [],
      };
    case LOAD_MENU_ITEM:
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

export default store;
