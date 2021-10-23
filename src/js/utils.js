export const $ = (selector) => document.querySelector(selector)

export const getStorageItem = (key) => JSON.parse(localStorage.getItem(key))

export const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
