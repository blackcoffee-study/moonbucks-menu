import { GetMenu } from "./API";
import { Category } from "./types";

let currentObserver: any = null;

export const observe = (fn: Function) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

// export function observable<T extends object>(state: T) {
//   const observeMap: Record<string | symbol, Set<Function>> = {};
//   const validator: ProxyHandler<T> = {
//     get(target, name, receiver) {
//       const value = target[name as keyof T];
//
//       //키별로 observamep이 따로 생성됨. 각각의 key마다.
//       observeMap[name] = observeMap[name] || new Set();
//       if (currentObserver) observeMap[name].add(currentObserver);
//       return Reflect.get(target, name, receiver);
//     },
//     set(target, name, value) {
//       if (target[name as keyof T] === value) return true;
//       if (JSON.stringify(target[name as keyof T]) === JSON.stringify(value))
//         return true;
//       typeof value === "object"
//         ? (target[name as keyof T] = observable(value))
//         : (target[name as keyof T] = value);
//       observeMap[name].forEach((fn) => fn()); //특정한 키의 생성된 observer set이 실행됨
//       return true;
//     },
//   };
//   return new Proxy<T>(state, validator);
// }

export const deepObservable = <T extends Object>(obj: T) => {
  const newObj = observable(obj);
  for (const [key, value] of Object.entries(newObj)) {
    if (typeof value !== "object" || value === null) continue;
    const newValue = observable(value);
    deepObservable(newValue);
  }
  return newObj;
};
export const observable = <T extends object>(state: T) => {
  const observeMap: Record<string | symbol, Set<Function>> = {};
  return new Proxy<T>(state, {
    get(target, name) {
      let value = target[name as keyof T];
      observeMap[name] = observeMap[name] || new Set();
      if (currentObserver) observeMap[name].add(currentObserver);

      return target[name as keyof T];
    },
    set(target, name, value) {
      if (target[name as keyof T] === value) return true;
      if (JSON.stringify(target[name as keyof T]) === JSON.stringify(value))
        return true;
      target[name as keyof T] = value;
      observeMap[name].forEach((fn) => fn());
      console.log(value);
      return true;
    },
  });
};
