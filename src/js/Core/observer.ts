import { GetMenu } from "./API";
import { Category } from "./types";

let currentObserver: any = null;

export const observe = (fn: Function) => {
  currentObserver = fn;
  fn();

  currentObserver = null;
};

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
      console.log(name, observeMap[name]);
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
