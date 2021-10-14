export default class MenuCategory {
    menuCategory = null;
    onSelectCategory = null;
    
    constructor({target, onSelectCategory}) {
        this.menuCategory = target;
        this.onSelectCategory = onSelectCategory;
        this.menuCategory.forEach(cateogory => {
            cateogory.addEventListener("click", (event) => this.onSelectCategory(event));
        });
    }
}
