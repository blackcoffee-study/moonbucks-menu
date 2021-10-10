const Form = document.querySelector("#espresso-menu-form");
const Input = Form.querySelector("input");
const Button = Form.querySelector("button");
const List = document.querySelector("ul #espresso-menu-list");
const CountSpan = document.querySelector("span .menu-count");
const $Edit = document.querySelectorAll("button .menu-edit-button");
const $Remove = document.querySelectorAll("button .menu-remove-button");



const BUTTON = Object.freeze({
	EDIT: "menu-edit-button",
	REMOVE: "menu-remove-button",
});


const onClick = (e) => {
	const children = List.querySelectorAll("li");
	const $li = e.target.closest("li");
	const $name = $li.querySelector("span .menu-name");
	if (e.target.classList.contains(BUTTON.EDIT)) {
		let newName = window.prompt("메뉴명을 입력하세요");
		if (newName && newName !== "") {
			$name.innerHTML = newName;
		}
	} else if (e.target.classList.contains(BUTTON.REMOVE)) {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			List.removeChild($li);
		}
	}
	CountSpan.innerHTML = `${children.length}`;
};

const onSubmit = (e) => {
	let newList = `
<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${Input.value}</span>
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
`;

	const $name = Input.value;
	e.preventDefault();
	if (!name || name.trim() === "") {
		return;
	} else {
		e.target.innerHTML += newList;
		Input.value = "";
	}
	List.addEventListener("click", onClick);
	console.log(Input.value);
};

Form.addEventListener("submit", onSubmit);
