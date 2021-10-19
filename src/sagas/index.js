import {
  LOCALSTORAGE_KEY,
  CREATE_MENU_SUCCESS,
  LOAD_MENU_SUCCESS,
  UPDATE_MENU_SUCCESS,
  DELETE_MENU_SUCCESS,
  LOAD_MENU_FAILURE,
  CREATE_MENU_FAILURE,
  UPDATE_MENU_FAILURE,
  DELETE_MENU_FAILURE,
  SOLDOUT_MENU_SUCCESS,
  SOLDOUT_MENU_FAILURE,
} from '../constants/index.js';

export default reducer => {
  return state => {
    return (action = {}) => {
      return reducer(state, watchDispatch(action));
    };
  };
};

const localState = {};

/**
 * Store의 Action을 감시
 *
 * @param {object} action
 * @returns next();
 */
const watchDispatch = action => {
  LOCALSTORAGE_KEY.forEach(key => {
    localState[key] = JSON.parse(localStorage.getItem(key)) || [];
  });
  Object.keys(fork).forEach(_key => {
    if (_key === action.type) return fork[_key](action);
  });
  return action;
};

/**
 * 1. 카테고리 메뉴 리스트 불러오기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchLoadMenu = action => {
  try {
    action.type = LOAD_MENU_SUCCESS;
    action.data = localState[action.category];
  } catch (error) {
    action.type = LOAD_MENU_FAILURE;
    action.message = error;
    console.log(error);
  }
};

/**
 * 2. 메뉴 추가하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchCreateMenu = action => {
  try {
    action.type = CREATE_MENU_SUCCESS;
    setStorage(action.category, action.data);
  } catch (error) {
    action.type = CREATE_MENU_FAILURE;
    action.message = error;
    console.log(error);
  }
};

/**
 * 3. 메뉴 수정하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchUpdateMenu = action => {
  try {
    action.type = UPDATE_MENU_SUCCESS;
    setStorage(action.category, action.data);
  } catch (error) {
    action.type = UPDATE_MENU_FAILURE;
    action.message = error;
    console.log(error);
  }
};

/**
 * 4. 메뉴 삭제하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchDeleteMenu = action => {
  try {
    action.type = DELETE_MENU_SUCCESS;
    setStorage(action.category, action.data);
  } catch (error) {
    action.type = DELETE_MENU_FAILURE;
    action.message = error;
    console.log(error);
  }
};

/**
 * 5. 메뉴 품절 처리
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchSoldoutMenu = action => {
  try {
    action.type = SOLDOUT_MENU_SUCCESS;
    setStorage(action.category, action.data);
  } catch (error) {
    action.type = SOLDOUT_MENU_FAILURE;
    action.message = error;
    console.log(error);
  }
};

/**
 * redux-saga 구현해서 적용해보기
 * @TODO generator/yield 구현
 */
const fork = {
  CREATE_MENU_REQUEST: action => {
    watchCreateMenu(action);
  },
  LOAD_MENU_REQUEST: action => {
    watchLoadMenu(action);
  },
  UPDATE_MENU_REQUEST: action => {
    watchUpdateMenu(action);
  },
  DELETE_MENU_REQUEST: action => {
    watchDeleteMenu(action);
  },
  SOLDOUT_MENU_REQUEST: action => {
    watchSoldoutMenu(action);
  },
};

const setStorage = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};
