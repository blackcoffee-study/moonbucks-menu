export default class Menu {
    onEditMenu = null;
    onRemoveMenu = null;
    
    constructor({onEditMenu, onRemoveMenu}) {
        this.onEditMenu = onEditMenu;
        this.onRemoveMenu = onRemoveMenu;
    }

    getMenuForm(menu) {
        var liElement = document.createElement('li');
        var spanElement = document.createElement('span');
        var editButtonElement = document.createElement('button');
        var removeButtonElement = document.createElement('button');

        liElement.setAttribute("id", menu.code);
        liElement.setAttribute("class", "menu-list-item d-flex items-center py-2");
        
        spanElement.setAttribute("class", "w-100 pl-2 menu-name");
        spanElement.innerHTML = menu.name;

        editButtonElement.setAttribute("class", "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button");
        editButtonElement.innerHTML = "수정";
        editButtonElement.addEventListener("click", event => this.onEditMenu(event));

        removeButtonElement.setAttribute("class", "bg-gray-50 text-gray-500 text-sm menu-remove-button");
        removeButtonElement.innerHTML = "삭제";
        removeButtonElement.addEventListener("click", event => this.onRemoveMenu(event));

        liElement.append(spanElement);
        liElement.append(editButtonElement);
        liElement.append(removeButtonElement);

        return liElement;
    }
}