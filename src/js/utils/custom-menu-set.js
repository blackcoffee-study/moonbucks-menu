import CustomSet from './custom-set.js';

export default class CustomMenuSet extends CustomSet {

  constructor(data) {
    super();
    if (data) this.data = data;
  }
  add(name, option) {
    this.data[name] = { "name": name, "isSoldOut": option?.isSoldOut ? option.isSoldOut : false };
    return this.data;
  }

  delete(datum) {
    super.delete(datum);
    return this.data;
  }

  update(before, after, option) {
    super.delete(before);
    this.add(after, option);
    return this.data;
  }

}