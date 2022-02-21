import { $ } from '../common/DOM.js';
import { getLocalStorage, setLocalStroage } from '../common/localStorage.js';
import {
  LOCALSTORAGE,
  PROMPT,
  ALERT,
  CONFIRM,
} from '../constants/constants.js';

export default class Model {
  constructor() {
    this.menu = {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      desert: [],
    };

    this.$ = {
      menuInput: $('#menu-name'),
      menuManange: $('ul'),
    };
  }

  getInputValue(input) {
    const { value } = input;

    return value;
  }

  isValidInput(category, value) {
    const storage = getLocalStorage(LOCALSTORAGE.ITEM);
    this.menu = storage;

    if (value.length === 0) {
      window.alert(ALERT.EMPTY);
      return;
    }
    if (value.trim().length === 0) {
      window.alert(ALERT.BLANK);
      return;
    }
    if (this.menu[category].includes(value)) {
      window.alert(ALERT.DUPLICATED);
      return;
    }

    return true;
  }

  storeMenusItems(category, inputValue) {
    if (this.isValidInput(category, inputValue)) {
      this.menu[category].push(inputValue);

      const exisiingEntries = getLocalStorage(LOCALSTORAGE.ITEM);

      if (exisiingEntries !== null) {
        exisiingEntries[category].push(inputValue);
        setLocalStroage(LOCALSTORAGE.ITEM, exisiingEntries);
      }

      if (exisiingEntries === null) {
        setLocalStroage(LOCALSTORAGE.ITEM, this.menu);
      }
    }
  }

  updateStorage(category) {
    this.storeMenusItems(category, this.getInputValue(this.$.menuInput));
  }

  editMenuList(target, category) {
    this.menu = getLocalStorage(LOCALSTORAGE.ITEM);

    const menuItem = target.closest('li').children[0];
    const name = menuItem.textContent;
    const index = this.menu[category].indexOf(name);
    let editedItemName = window.prompt(PROMPT.RENAME);

    if (editedItemName) {
      menuItem.textContent = editedItemName;
      this.menu[category].splice(index, 1, editedItemName);
      setLocalStroage(LOCALSTORAGE.ITEM, this.menu);
    }

    if (!editedItemName) {
      alert(ALERT.RENAME);
    }
  }

  deleteListItem(target, category) {
    const storage = getLocalStorage(LOCALSTORAGE.ITEM);
    const name = target.parentNode.children[0].textContent;
    const index = storage[category].indexOf(name);

    this.menu = storage;

    if (window.confirm(CONFIRM.DELETE)) {
      this.menu[category].splice(index, 1);
      setLocalStroage(LOCALSTORAGE.ITEM, this.menu);
      this.$.menuManange.removeChild(target.parentNode);
    }
  }

  itemSoldOut(target) {
    const menuItem = target.closest('li').children[0];

    if (menuItem.classList.contains('sold-out')) {
      menuItem.classList.remove('sold-out');
    } else {
      menuItem.classList.add('sold-out');
    }
  }
}
