import { SELECTORS } from "../constant/element.js";

export default class MenuCategory {    
    constructor({target, onSelectCategory}) {
        this.menuCategory = target;
        this.onSelectCategory = onSelectCategory;
        this.menuCategory.addEventListener("click", ({target}) => {
            if(target.classList.contains(SELECTORS.CLASS.CAFE_CATEGORY_NAME.slice(1, SELECTORS.CLASS.CAFE_CATEGORY_NAME.length))) {
                this.onSelectCategory(target);
            }
        })
    }
}
