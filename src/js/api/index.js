const storage = window.localStorage;

const localStorage = {
  set(tag, data) {
    const prevData = this.get(tag).data;
    const newData = prevData.concat(data);
    storage.setItem(tag, JSON.stringify(newData));
    return { tag, data: newData };
  },

  get(tag) {
    const data = JSON.parse(storage.getItem(tag)) ?? [];
    return { tag, data };
  },

  edit(tag, data) {
    const prevData = this.get(tag).data;
    const result = this.removeAll(tag);

    if (!result.data) {
      return { tag, data: [] };
    }
    const test = prevData.filter((d) => d.id !== data.id);
    const newTest = test.concat(data);
    this.set(tag, newTest);
    return { tag, data };
  },

  removeAll(tag) {
    const hasData = storage.getItem(tag);

    if (!hasData) {
      return { tag, data: false };
    }

    storage.removeItem(tag);
    return { tag, data: true };
  },

  removeItem(tag, { id }) {
    const prevData = this.get(tag).data;

    const result = this.removeAll(tag);

    if (!result.data) {
      return { tag, data: [] };
    }

    this.set(
      tag,
      prevData.filter((d) => d.id !== id)
    );
    return { tag, data: id };
  },

  removeTab() {
    return storage.removeItem('currentTab');
  },
};

export default localStorage;
