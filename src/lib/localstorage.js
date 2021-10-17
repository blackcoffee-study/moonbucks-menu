export function setLocalStorage(key, value) {
  window.localStorage.setItem(key, window.JSON.stringify(value));
}
export function getLocalStorage(key) {
  return window.JSON.parse(window.localStorage.getItem(key));
}
