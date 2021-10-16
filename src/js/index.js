const $input = document.getElementById("espresso-menu-name");
const $submitBtn = document.getElementById("espresso-menu-submit-button");
const $list = document.getElementById("espresso-menu-list");

// 버튼 종류
const BUTTON = Object.freeze({
    EDIT: "menu-edit-button",
    REMOVE: "menu-remove-button"
})

// 엔터
$input.addEventListener("keydown", event => {
    if(event.keyCode === 13 ) {
        event.preventDefault(); //엔터치면 새로고침 되는거 방지
        addMenu();
    }
});

// 확인 버튼
$submitBtn.addEventListener("click", event => {
    addMenu();
});

function addMenu() {
    const name = $input.value;

    if(name.trim() === '') {
        alert("값을 입력해주세요");
        return;
    }

    const li = document.createElement("li");
    li.setAttribute("class", "menu-list-item d-flex items-center py-2");
    li.innerHTML = 
    `<span class="w-100 pl-2 menu-name">${name}</span>
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
    </button>`;

    $list.appendChild(li);
    $input.value = ""; //리셋

    setMenuCount(); //갯수
}

function setMenuCount() {
    const $menuCount = document.getElementsByClassName("menu-count")[0];
    const count = $list.childElementCount;
    $menuCount.innerHTML = `총 ${count}개`;
}

// 수정 / 삭제
$list.addEventListener("click", event => {

    const $target = event.target;
    const $li = $target.parentNode;
    const $span = $li.children[0]; //수정할 span
    const classList = $target.classList;  //클래스 리스트

    //수정버튼
    if(classList.contains(BUTTON.EDIT)) {
        const menuName = prompt("메뉴명을 수정하세요");
        $span.innerHTML = menuName;

    } else if(classList.contains(BUTTON.REMOVE)) {
        if(confirm("정말 삭제하시겠습니까?")) {
            $list.removeChild($li);
        }
    }

    setMenuCount(); //메뉴 갯수
});




