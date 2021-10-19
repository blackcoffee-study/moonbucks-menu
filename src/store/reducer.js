import {
  CHANGE_CATEGORY,
  CREATE_MENU_SUCCESS,
  LOAD_MENU_SUCCESS,
  UPDATE_MENU_SUCCESS,
  DELETE_MENU_SUCCESS,
  SOLDOUT_MENU_SUCCESS,
} from '../constants/index.js';

const initialState = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
  currentCategory: 'espresso',
  currentCategoryText: '☕ 에스프레소',
  menuCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
        currentCategoryText: action.currentCategoryText,
      };
    case LOAD_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
        menuCount: action.data.length,
      };
    case CREATE_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
        menuCount: ++state.menuCount,
      };
    case UPDATE_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
      };
    case DELETE_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
        menuCount: --state.menuCount,
      };
    case SOLDOUT_MENU_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
