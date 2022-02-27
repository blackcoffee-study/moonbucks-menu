export const MESSAGE = Object.freeze({
  UPDATE: '메뉴명을 수정하세요.',
  DELETE: '정말 삭제하시겠습니까?',
});

export const INITIAL_STATE = Object.freeze({
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  dessert: [],
});

export const INITIAL_RENDERING_MENU = 'espresso';

export const KOREAN_MENU_NAME = Object.freeze({
  espresso: '☕ 에스프레소',
  frappuccino: '🥤 프라푸치노',
  blended: '🍹 블렌디드',
  teavana: '🫖 티바나',
  dessert: '🍰 디저트',
});
