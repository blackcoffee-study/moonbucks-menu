// 현재 메뉴 상태를 관리하는 변수
const state = new MenuStatus([]);

const inputTag = document.getElementById("espresso-menu-name");
const submitButton = document.getElementById("espresso-menu-submit-button");

function onInputKeyDown(e) {
    const inputValue = inputTag.value;
    const trimmedInputValueString = String(inputValue).trim();

    if (e.key === 'Enter') {
        addNewMenu(trimmedInputValueString);
        inputTag.value = '';
    }
}

function onSubmitButtonClicked(e) {
    const inputValue = inputTag.value;
	const trimmedInputValueString = String(inputValue).trim();

    addNewMenu(trimmedInputValueString);
    inputTag.value = "";
}

function addNewMenu(menuName) {
	const newMenu = new Menu(menuName);
	state.add(newMenu);
	console.log(state.getMenuList());
}


inputTag.addEventListener("keydown", onInputKeyDown);
submitButton.addEventListener("click", onSubmitButtonClicked);
