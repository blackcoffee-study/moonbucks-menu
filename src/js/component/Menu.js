export default class Menu {
    onSoldOutMenu = null
    onEditMenu = null;
    onRemoveMenu = null;
    
    constructor({onSoldOutMenu, onEditMenu, onRemoveMenu}) {
        this.onSoldOutMenu = onSoldOutMenu;
        this.onEditMenu = onEditMenu;
        this.onRemoveMenu = onRemoveMenu;
    }

    getMenuForm(menu) {
        var liElement = document.createElement("li");
        var spanElement = document.createElement("span");
        var soldOutButtonElement = document.createElement("button");
        var editButtonElement = document.createElement("button");
        var removeButtonElement = document.createElement("button");

        liElement.setAttribute("id", menu.code);
        liElement.setAttribute("data-cateogry", menu.category);
        liElement.setAttribute("class", `menu-list-item d-flex items-center py-2 ${menu.isSoldOut ? "sold-out" : ""}`);
        
        spanElement.setAttribute("class", "w-100 pl-2 menu-name");
        spanElement.innerHTML = menu.name;

        soldOutButtonElement.setAttribute("class", "bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button");
        soldOutButtonElement.innerHTML = "품절";
        soldOutButtonElement.addEventListener("click", () => this.onSoldOutMenu(spanElement));

        editButtonElement.setAttribute("class", "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button");
        editButtonElement.innerHTML = "수정";
        editButtonElement.addEventListener("click", () => this.onEditMenu(liElement));

        removeButtonElement.setAttribute("class", "bg-gray-50 text-gray-500 text-sm menu-remove-button");
        removeButtonElement.innerHTML = "삭제";
        removeButtonElement.addEventListener("click", () => this.onRemoveMenu(liElement));

        liElement.append(spanElement);
        liElement.append(soldOutButtonElement);
        liElement.append(editButtonElement);
        liElement.append(removeButtonElement);

        return liElement;
    }
}
