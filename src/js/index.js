const Form = document.getElementById("espresso-menu-form");
const Input = Form.querySelector("input");
const Button = Form.querySelector("button");
const List = document.querySelector("ul#espresso-menu-list");
const CountSpan = document.querySelector("span.menu-count");
const $Edit = document.querySelectorAll("button.menu-edit-button");
const $Remove = document.querySelectorAll("button.menu-remove-button");



const BUTTON = Object.freeze({
	EDIT: "menu-edit-button",
	REMOVE: "menu-remove-button",
});
function SetCount(){
	const children = List.querySelectorAll("li");
	CountSpan.innerHTML = `총 ${children.length}개`;
}

const onClick = (e) => {
	
	const $li = e.target.closest("li");
	const $name = $li.querySelector("span.menu-name");
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
	SetCount();
};

const onSubmit = () => {

	const $name = Input.value;
	let newList = `
<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${$name}</span>
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
	if (!$name || $name.trim() === "") {
		return;
	} else {
		List.innerHTML += newList;
		Input.value = "";
	}
	List.addEventListener("click", onClick);
	SetCount();
};

Input.addEventListener("keydown", e=>{
	if(e.key==="Enter"){
		e.preventDefault();
		onSubmit();
	}
})
Button.addEventListener("click", e=>{
	onSubmit()
});

