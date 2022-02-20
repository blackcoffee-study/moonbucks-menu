import { getLocalStorage } from '../common/localStorage.js';
import { LOCALSTORAGE } from '../constants/constants.js';

export default class Model {
  constructor() {
    this.menu = {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      desert: [],
    };
  }

  getInputValue(input) {
    const { value } = input;

    return value;
  }

  clearInputValue(input) {
    input.value = '';
  }

  updateMenuCount(target, category) {
    const storage = getLocalStorage(LOCALSTORAGE.ITEM);

    target.textContent = `총 ${storage[category].length}개`;
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
