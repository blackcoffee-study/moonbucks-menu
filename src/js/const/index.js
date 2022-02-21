export const CATEGORY = {
  ESPRESSO: 'espresso',
  FRAPPUCCINO: 'frappuccino',
  BLENDED: 'blended',
  TEAVANA: 'teavana',
  DESERT: 'desert',
};

export const CATEGORY_LABEL = {
  [CATEGORY.ESPRESSO]: '☕ 에스프레소',
  [CATEGORY.FRAPPUCCINO]: '🥤 프라푸치노',
  [CATEGORY.BLENDED]: '🍹 블렌디드',
  [CATEGORY.TEAVANA]: '🫖 티바나',
  [CATEGORY.DESERT]: '🍰 디저트',
};

export const ACTION = {
  ADD_MENU: 'addMenu',
  ADD_MENUS: 'addMenus',
  EDIT_MENU: 'editMenu',
  REMOVE_MENU: 'removeMenu',
  GET_MENUS: 'getMenus',
  TOGGLE_TAB: 'toggleTab',
  ADD_TABS: 'addTabs',
  GET_TABS: 'getTabs',
  GET_CURRENT_TAB: 'getCurrentTab',
};

export const SELECTOR = {
  MENU_ITEM: '.menu-list-item',
  MENU_NAME: '.menu-name',
  COUNT: '#menu-count',
  TAB: '.tab',
  MENU_HEADER: '.heading',
};

export const MESSAGE = {
  PLZ_INSERT_MENU: '메뉴를 입력해주세요.',
  ALERT_ALREADY_ADDED_MENU: '등록된 메뉴 입니다.',
  CONFIRM_REMOVE_MENU: '을/를 삭제하시겠습니까?',
};
