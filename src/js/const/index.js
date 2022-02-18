export const CATEGORY = {
  ESPRESSO: 'espresso',
  FRAPPUCCINO: 'frappuccino',
  BLENDED: 'blended',
  TEAVANA: 'teavana',
  DESERT: 'desert',
};

export const ACTION = {
  ADD_MENU: 'addMenu',
  EDIT_MENU: 'editMenu',
  REMOVE_MENU: 'removeMenu',
  GET_MENUS: 'getMenus',
  GET_MENU_BY_ID: 'getMenuById',
  GET_SIZE: 'getSize',
  HAS_MENU_BY_ID: 'hasMenuById',
  HAS_MENU_BY_NAME: 'hasMenuByName',
};

export const SELECTOR = {
  FORM: '#espresso-menu-form',
  MENU_LIST: '#espresso-menu-list',
  MENU_ITEM: '.menu-list-item',
  MENU_NAME: '.menu-name',
  INPUT_MENU: '#espresso-menu-name',
  COUNT: '#menu-count',
};

export const MESSAGE = {
  PLZ_INSERT_MENU: '메뉴를 입력해주세요.',
  ALERT_ALREADY_ADDED_MENU: '등록된 메뉴 입니다.',
  CONFIRM_REMOVE_MENU: '을/를 삭제하시겠습니까?',
};
