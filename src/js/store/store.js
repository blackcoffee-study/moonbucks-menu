export default class Store {
  constructor(name) {
    this._dbname = this._storageNameTemplate(name);

    if (!localStorage.getItem(this._storageNameTemplate(name))) {
      let menuList = [];

      localStorage.setItem(this._storageNameTemplate(name), menuList);
    }
  }

  // setter, getter

  setLocalStorage(menuList) {
    localStorage.setItem(this._dbname, JSON.stringify(menuList));
  }

  getLocalStorage() {
    return localStorage.getItem(this._dbname);
  }

  // private method

  _storageNameTemplate(name) {
    return `menu-list-${name}`;
  }

  // debug

  _showAllData() {
    console.group(`localStorage: ${this._dbname}`);
    console.log(localStorage.getItem(this._dbname));
    console.groupEnd('localStorage');
  }

  _initalizeLocalStorage() {
    try {
      localStorage.clear();
      console.log('localStorage is cleared.');
    } catch (err) {
      console.error(err);
    }
  }
}
