function MenuList() {
    this.$menulist = document.getElementById("espresso-menu-list");

    this.state = [];

    this.setState = (menulist) => {
        this.state = menulist;
        this.render();
    }

    this.render = () => {
        const template = this.state
            .map((menuItem, index) => {
                return `
                <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                  <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
                  <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                  >
                    삭제
                  </button>
                </li>`;
        })
        .join("");

        this.$menulist.innerHTML = template;
    }
}

export default MenuList;