export default class LocalStorage {

    constructor(key) {
      this.key = key;
    }

    get () {
      return JSON.parse(localStorage.getItem(this.key));
    }

    set (value) {
      return localStorage.setItem(this.key, JSON.stringify(value));
    }

    remove (){
      localStorage.removeItem(this.key);
    }
  }