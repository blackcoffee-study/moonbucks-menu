export class MenuComponent {
  element;
  constructor({ id, name, isSoldOut }) {
    const template = document.createElement("li");
    template.setAttribute("data-id", id);
    template.classList = "menu-list-item d-flex items-center py-2";
    template.innerHTML = `
        <span class="w-100 pl-2 menu-name"></span>
          <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
          품절
        </button>
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
        `;

    this.element = template;

    const spanElement = this.element.querySelector(".menu-name");
    spanElement.innerText = name;
    isSoldOut && spanElement.classList.add("sold-out");
  }

  attachTo(parentElement, position = "beforeend") {
    parentElement.insertAdjacentElement(position, this.element);
  }
}
