export const getCategories = () => {
  return [
    {
      name: "에스프레소",
      icon: "☕",
      key: "espresso",
    },
    {
      name: "프라푸치노",
      icon: "🥤",
      key: "frappuccino",
    },
    {
      name: "블렌디드",
      icon: "🍹",
      key: "blended",
    },
    {
      name: "티바나",
      icon: "🫖",
      key: "teavana",
    },
    {
      name: "디저트",
      icon: "🍰",
      key: "dessert",
    },
  ];
};
export const action = Object.freeze({
  INIT: "Init",
  FETCH: "FetchCategory",
  ADD: "AddMenu",
  DELETE: "DeleteMenu",
  EDIT: "EditMenu",
  TOGGLE: "ToggleMenuSoldOut",
});
export const category = Object.freeze({
  ESPRESSO: "espresso",
  FRAPPUCINO: "frappuccino",
  BLENDED: "blended",
  TEAVANA: "teavana",
  DESERT: "desert",
});
