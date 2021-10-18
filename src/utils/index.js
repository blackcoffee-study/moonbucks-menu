export default {
  $: selector => {
    return document.querySelector(selector);
  },

  $$: selector => {
    return document.querySelectorAll(selector);
  },

  deepClone: state => {
    return JSON.parse(JSON.stringify(state));
  },

  objectFreeze: state => {
    return Object.freeze(JSON.parse(JSON.stringify(state)));
  },

  isEqualsObject: (object1, object2) => {
    return JSON.stringify(object1) === JSON.stringify(object2);
  },

  debounce: callback => {
    let currentCallback = null;

    return () => {
      if (currentCallback) {
        cancelAnimationFrame(currentCallback);
        currentCallback = null;
      }
      currentCallback = requestAnimationFrame(() => callback());
    };
  },

  isNotEquals: (target1, target2) => {
    return target1 !== target2;
  },

  getMaxLength: (target1 = 0, target2 = 1) => {
    return Math.max(target1, target2);
  },

  isCorrectType: (target, type) => {
    return typeof target === type;
  },
};
