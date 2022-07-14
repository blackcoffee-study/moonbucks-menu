// repository : 기본은 인메모리
export default class EtoileRepository {
  caches = new Map();

  insert(category, menu) {
    const set = this.caches.get(category) || new Set();
    set.add(menu);
    this.caches.set(category, set);
  }
  getAll(category) {
    return [...this.caches.get(category)];
  }
}
