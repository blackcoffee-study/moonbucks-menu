let currentObserver: Function | null = null;

export const observe = (fn: Function) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

export function observable<T extends object>(state: T) {
  const observeMap: { [key: string | symbol]: Set<Function> } = {};
  return new Proxy<T>(state, {
    get(target, name) {
      observeMap[name] = observeMap[name] || new Set();
      if (currentObserver) observeMap[name].add(currentObserver);
      return target[name as keyof T];
    },
    set(target, name, value) {
      if (typeof value === "object") {
        target[name as keyof T] = observable(value);
      }
      if (target[name as keyof T] === value) return true;
      if (JSON.stringify(target[name as keyof T]) === JSON.stringify(value))
        return true;
      target[name as keyof T] = value;
      observeMap[name].forEach((fn) => fn());
      return true;
    },
  });
}

// export function observable<T extends object>(obj: T) {
//   Object.keys(obj).forEach((key) => {
//     let _value = obj[key as keyof T];
//     const observers = new Set();
//     Object.defineProperty(obj, key, {
//       get() {
//         if (currentObserver) observers.add(currentObserver);
//         return _value;
//       },
//       set(value) {
//         if (typeof value === "object") {
//           _value = observable(value);
//         }
//         if (_value === value) return;
//         if (JSON.stringify(_value) === JSON.stringify(value)) return;
//         _value = value;
//         observers.forEach((fn: any) => fn());
//       },
//     });
//   });
//   return obj;
// }
