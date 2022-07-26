export const INITIAL_STATE = {
  menu: {
    espresso: [
      { name: '에스프레소 싱글', isSold: false },
      { name: '에스프레소 더블', isSold: false },
      { name: '에스프레소 도피오', isSold: false },
    ],
    frappuccino: [
      { name: '더블 에스프레소 칩 프라푸치노', isSold: false },
      { name: '모카 프라푸치노', isSold: false },
      { name: '에스프레소 프라푸치노', isSold: false },
    ],
    blended: [
      { name: '캐러멜 아이스 블렌디드', isSold: false },
      { name: '헤이즐넛 아이스 블렌디드', isSold: false },
      { name: '모카 아이스 블렌디드', isSold: false },
    ],
    teavana: [
      { name: '폼폼 민트 티', isSold: false },
      { name: '폼폼 유스베리 티', isSold: false },
      { name: '제주 그린 티 브리즈', isSold: false },
    ],
    desert: [
      { name: '아이스크림', isSold: false },
      { name: '아이스크림 케이크', isSold: false },
      { name: '셔벗', isSold: false },
    ],
  },
}

export const MENU_MAP = {
  espresso: {
    iconName: '☕ 에스프레소',
    name: '에스프레소',
  },
  frappuccino: {
    iconName: '🥤 프라푸치노',
    name: '프라푸치노',
  },
  blended: { iconName: '🍹 블렌디드', name: '블렌디드' },
  teavana: { iconName: '🫖 티바나', name: '티바나' },
  desert: { iconName: '🍰 디저트', name: '디저트' },
}
