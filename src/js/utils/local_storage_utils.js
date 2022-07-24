import { localStorageKey } from "./constant_utils.js";

const localCategoryState = JSON.parse(
  localStorage.getItem(localStorageKey.categoryState)
);

const localCategorySeqState = JSON.parse(
  localStorage.getItem(localStorageKey.categorySeqState)
);

const saveInLocalStorageHandler = (localStorageKey) => ({
  set(target, prop, val, receiver) {
    Reflect.set(target, prop, val, receiver);
    localStorage.setItem(localStorageKey, JSON.stringify(target));
    return true;
  },
});

export const categoryState = new Proxy(
  localCategoryState || {
    espresso: {},
    frappuccino: {},
    blended: {},
    teavana: {},
    dessert: {},
  },
  saveInLocalStorageHandler(localStorageKey.categoryState)
);

export const categorySeqState = new Proxy(
  localCategorySeqState || {
    espresso: 0,
    frappuccino: 0,
    blended: 0,
    teavana: 0,
    dessert: 0,
  },
  saveInLocalStorageHandler(localStorageKey.categorySeqState)
);
