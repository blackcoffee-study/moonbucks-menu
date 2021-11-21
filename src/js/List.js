export default function List({ $app, initialState, onEdit }) {
  this.state = initialState;

  this.$list = document.createElement("ul");
  this.$list.id = "espresso-menu-list";
  this.$list.className = "mt-3 pl-0";

  $app.appendChild(this.$list);

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.setEvent = () => {
    this.$list.addEventListener("click", (e) => {
      if (e.target.closest("#editTodo")) {
        const id = e.target.closest("li").id;

        const prevTodo = e.target
          .closest("li")
          .querySelector(".menu-name").textContent;

        const newTodo = window.prompt("할 일을 입력해 주세요", prevTodo);

        onEdit({ id, name: newTodo });
        return;
      }
    });
  };

  this.template = () => `
    ${this.state
      .map(
        ({ name, id }) => `
        <li id="${id}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${name}</span>
          <button
            id="editTodo"
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
  this.setEvent();
}
