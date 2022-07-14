export default class CategoryService {
  constructor(catergories) {
    this.catergories = catergories; // 이거 string[]로 들어와도 Record<key, Category>으로 관리해야할건데
    this.currentCategory = catergories[0];
  }
  getCurrent() {
    return this.currentCategory;
  }
  switch(category) {}
}
