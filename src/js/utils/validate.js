import { MESSAGE } from "../const/index.js";

export function isBlank(menuName) {
  if (!menuName) alert(MESSAGE.WARN_BLANK);
  return !menuName;
}

export function isReduplicated(arr, menuName, id = null) {
  const reduplication = arr.find(
    (item) => item.name === menuName && item.id !== parseInt(id)
  );
  if (reduplication) alert(MESSAGE.ALREADY_EXISTS);
  return !!reduplication;
}
