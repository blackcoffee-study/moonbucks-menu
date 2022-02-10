// step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기.
// 요구사항 1) 메뉴추가

//Enter키 입력시 새로고침 방지
const espressoMenuForm = document.querySelector('#espresso-menu-form');
espressoMenuForm.setAttribute('onsubmit', "return false;");


const espressoMenuName = document.querySelector('#espresso-menu-name');
const espressoMenuList = document.querySelector('#espresso-menu-list');

//신규메뉴 추가시 메뉴아이템에 들어갈 html코드 반환 함수
const espressoMenuItem = (espressoMenuName_value) => {
    return `<li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressoMenuName_value}</span>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
            </li>`}

//신규메뉴 추가 함수
const addEspressoMenuName = () => { //
    if (espressoMenuName.value === "") {//요구사항 1-2) 사용자 입력값이 빈값이라면 추가되지 않는다.
        alert('값을 입력해주세요');
        return;
    }
    espressoMenuList.insertAdjacentHTML("afterbegin", espressoMenuItem(espressoMenuName.value)); // ???한글입력시 이중입력되는 이슈있음.???
    espressoMenuName.value = "";//요구사항 1-1) 메뉴가 추가되고나면 input은 빈 값으로 초기화한다.
    document.querySelector('.menu-count').innerHTML = `총 ${espressoMenuList.childElementCount}개`;// 요구사항4) 총 메뉴 갯수를 count하여 상단에 보여준다.
}

//메뉴이름을 입력받고, 엔터를 눌렀을때 메뉴추가 
espressoMenuName.addEventListener('keydown', (event) => { //요구사항 1) 에스프레소 메뉴에 새로운 메뉴를 엔터키입력으로 추가한다.
    if (event.key !== 'Enter') return;
    addEspressoMenuName();
})

//메뉴이름을 입력받고, 확인버튼을 클릭하면 메뉴가 추가된다.
const espressoMenuSubmitBtn = document.querySelector('#espresso-menu-submit-button');
espressoMenuSubmitBtn.addEventListener('click', () => {//요구사항 1) 에스프레소 메뉴에 새로운 메뉴를 확인버튼으로 추가한다.
    addEspressoMenuName();
});


// 요구사항2) 메뉴의 수정버튼을 눌러 메뉴이름을 수정할 수 있다.
//- [ ] 메뉴의 수정 버튼클릭 이벤트를 받으면, 메뉴를 수정하는 prompt창이 뜬다.
//- [ ] prompt창에서 변경할 메뉴명을 입력후, 확인버튼을 누르면 메뉴가 수정된다.
const menuEditButton = document.querySelector('.menu-edit-button');
// menuEditButton.addEventListener('click', (event) => {
//     window.prompt('메뉴명을 수정하세요', ${})
//     event.target.
//  })


// 요구사항3) 메뉴삭제
//- [ ] 메뉴 삭제 버튼클릭 이벤트를 받으면, 메뉴를 삭제하겠냐는 confirm 인터페이스가 나타난다.
//- [ ] confirm 인터페이스에서 확인을 누르면 메뉴가 삭제된다.
//- [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.







