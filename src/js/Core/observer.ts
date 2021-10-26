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
        observable(value);
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
