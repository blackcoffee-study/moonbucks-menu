import CustomSet from './CustomSet.js';

export default class CustomMenuSet extends CustomSet {
  add(name, option) {
    this.data[name] = { "name": name, "isSoldOut": option?.isSoldOut ? option.isSoldOut : false };
  }

}