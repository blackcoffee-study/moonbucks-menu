export function on(target, eventName, handler) {
  target.addEventListener(eventName, handler);
}

export function emit(target, eventName, detail) {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
}
