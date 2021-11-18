export default function List({ $app, initialState }) {
  this.state = initialState;

  this.$list = document.createElement("ul");
  this.$list.id = "espresso-menu-list";
  this.$list.className = "espresso-menu-list";

  $app.appendChild(this.$list);

  this.template = () => `
    ${this.state
      .map(
        ({ name }) => `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${name}</span>
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
        </li>
      `
      )
      .join("")}
  `;

  this.render = () => {
    this.$list.innerHTML = this.template();
  };

  this.render();
}
