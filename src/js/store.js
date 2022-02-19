import { CATEGORY, MENU } from "./consts.js";

export const store = {
  currentTab: CATEGORY.espresso,
  [MENU[CATEGORY.espresso]]: [],
  [MENU[CATEGORY.frappuccino]]: [],
  [MENU[CATEGORY.blended]]: [],
  [MENU[CATEGORY.teavana]]: [],
  [MENU[CATEGORY.desert]]: [],
};
