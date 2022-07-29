export function CafeStorage() {
  const KEY = "cafe";

  function save(cafe) {
    localStorage.setItem(KEY, JSON.stringify(cafe));
  }

  function get() {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  }

  return { save, get };
}
