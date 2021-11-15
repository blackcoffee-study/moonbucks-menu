export default class Store {
  constructor(name) {
    this._dbname = name;

    if (!localStorage.getItem(name)) {
      let menuList = [];

      localStorage.setItem(name, menuList);
    }
  }

  setLocalStorage(menuName) {
    localStorage.setItem(this._dbname, JSON.stringify(menuName));
  }

  getLocalStorage() {
    return localStorage.getItem(this._dbname);
  }

  showAllData() {
    console.group(`localStorage: ${this._dbname}`);
    for (let i = 0; i < localStorage.length; i++) {
      console.log(localStorage.key(i));
    }
    console.groupEnd('localStorage');
  }

  initalizeLocalStorage() {
    try {
      localStorage.clear();
      console.log('localStorage is cleared.');
    } catch (err) {
      console.error(err);
    }
  }
}
