export const getLocalStorageData = (key) => {
  try {
    const storageData = localStorage.getItem(key);
    // local storage에 데이터가 없을 경우 빈배열 반환
    const initData = storageData ? JSON.parse(storageData) : [];
    return initData;
  } catch (e) {
    return initData;
  }
};

export const setLocalStorageData = (key, newState) => {
  try {
    localStorage.setItem(key, JSON.stringify(newState));
  } catch (e) {
    alert(e.message);
  }
};

// if (getLocalStorageData(MENU_STORAGE_KEY) === []) {
//   this.state = {
//     currentCategory: DEFAULT_CATEGORY,
//     espresso: [],
//     frappuccino: [],
//     blended: [],
//     teavana: [],
//     dessert: [],
//   };
// } else {
//   this.state = getLocalStorageData(MENU_STORAGE_KEY);
// }
