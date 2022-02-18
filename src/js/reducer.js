import createStore from './store/config.js';

const initialState = {
  menuList: [],
};

export const ADD_ESPRESSO_MENU = 'ADD_ESPRESSO_MENU';
export const UPDATE_ESPRESSO_MENU = 'UPDATE_ESPRESSO_MENU';
export const DELETE_ESPRESSO_MENU = 'DELETE_ESPRESSO_MENU';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ESPRESSO_MENU:
      return {
        ...state,
        menuList: [ ...state.menuList, action.data ],
      };
    case UPDATE_ESPRESSO_MENU:
      return {
        ...state,
        menuList: state.menuList.map((menu) => menu.id === action.data.id ? action.data : menu),
      };
    case DELETE_ESPRESSO_MENU:
      return {
        ...state,
        menuList: state.menuList.filter((menu) => menu.id !== action.data),
      };
    default:
      return state;
  }
}

const store = createStore(initialState, (reducer));

export default store;
