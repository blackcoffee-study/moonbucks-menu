export const INITIAL_STATE = {
  menu: {
    espresso: [
      { name: 'test', isSold: 'false' },
      { name: 'test2', isSold: 'false' },
      { name: 'test3', isSold: 'false' },
    ],
    frappuccino: [
      { name: 'test5', isSold: 'false' },
      { name: 'test26', isSold: 'false' },
      { name: 'test37', isSold: 'false' },
    ],
    blended: [
      { name: 'test234', isSold: 'false' },
      { name: 'test32', isSold: 'false' },
      { name: 'test33', isSold: 'false' },
    ],
    teavana: [
      { name: 'tes3t', isSold: 'false' },
      { name: 'tes3t2', isSold: 'false' },
      { name: 'tes3t3', isSold: 'false' },
    ],
    desert: [
      { name: 'te234st', isSold: 'false' },
      { name: 'tes234t2', isSold: 'false' },
      { name: 'te234st3', isSold: 'false' },
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
