// step1 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기.
// 요구사항1) 메뉴추가

//DOM요소 선택 함수
const $ = (selector) => document.querySelector(selector);

//Enter키 입력시 새로고침 방지
const espressoMenuForm = $('#espresso-menu-form');
espressoMenuForm.setAttribute('onsubmit', "return false;");

const espressoMenuName = $('#espresso-menu-name');
const espressoMenuList = $('#espresso-menu-list');

//신규메뉴 추가시 메뉴아이템에 들어갈 html코드 반환 함수
const espressoMenuItem = (espressoMenuName_value) => {
    return `<li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressoMenuName_value}</span>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
            </li>`
}

//신규메뉴 추가 함수
const addEspressoMenuName = () => { //
    if (espressoMenuName.value.trim() === "") {//요구사항 1-2) 사용자 입력값이 빈값이라면 추가되지 않는다. (공백이 들어올경우를 고려함)
        alert('값을 입력해주세요');
        return;
    }
    espressoMenuList.insertAdjacentHTML("afterbegin", espressoMenuItem(espressoMenuName.value));
    espressoMenuName.value = "";//요구사항 1-1) 메뉴가 추가되고나면 input은 빈 값으로 초기화한다.
    $('.menu-count').textContent = `총 ${espressoMenuList.childElementCount}개`;// 요구사항4) 총 메뉴 갯수를 count하여 상단에 보여준다.
}

//메뉴이름을 입력받고, 엔터를 눌렀을때 메뉴추가
espressoMenuName.addEventListener('keydown', (event) => { //요구사항 1) 에스프레소 메뉴에 새로운 메뉴를 엔터키입력으로 추가한다.
    if (event.key !== 'Enter') return;
    if (event.isComposing !== true) { addEspressoMenuName(); } // keydown이벤트 발생시, 한국어 중복입력되는 이슈를 방지하기 위함.
})

//메뉴이름을 입력받고, 확인버튼을 클릭하면 메뉴가 추가된다.
const espressoMenuSubmitBtn = $('#espresso-menu-submit-button');
espressoMenuSubmitBtn.addEventListener('click', () => {//요구사항 1) 에스프레소 메뉴에 새로운 메뉴를 확인버튼으로 추가한다.
    addEspressoMenuName();
});


// 요구사항2) 메뉴 수정 <-이벤트위임(Delegation) 사용
espressoMenuList.addEventListener('click', (e) => {
    const parentNode = e.target.parentNode;
    if (e.target.classList.contains('menu-edit-button')) {
        const menuName = parentNode.querySelector('.menu-name');
        menuName.textContent = window.prompt('메뉴명을 수정하세요', menuName.textContent);// 요구사항2-1)메뉴별 수정 버튼클릭 이벤트를 받으면, 메뉴명에 들어갈 텍스트를 입력하는 prompt창이 뜨고, 확인버튼을 누르면 메뉴명이 수정된다.
    } else if (e.target.classList.contains('menu-remove-button')) {
        // 요구사항3) 메뉴 식제
        const menu = parentNode;
        const result = window.confirm('정말 삭제하시겠습니까?');// 요구사항 3-1) 메뉴 삭제 버튼클릭 이벤트를 받으면, 메뉴를 삭제하겠냐는 confirm 인터페이스가 나타나고, 확인을 누르면 메뉴가삭제된다.
        if (result === true) { menu.remove(); }
    }
});







