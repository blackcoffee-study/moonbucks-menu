// repository : 기본은 인메모리
export default class EtoileRepository {
  caches = new Map();

  insert(category, menu) {
    const menus = this.caches.get(category) || [];
    menus.push(menu);

    this.caches.set(category, menus);
  }

  getAll(category) {
    return this.caches.get(category);
  }

  update(category, { id, name }) {
    const menus = this.caches.get(category);

    const index = menus.findIndex((menu) => menu.id === id);

    if (index === -1) return;

    menus[index] = { ...menus[index], name };

    this.caches.set(category, menus);
  }
}
