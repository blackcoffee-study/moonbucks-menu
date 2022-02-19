//   🎯 step2 요구사항 - 상태 관리로 메뉴 관리하기
// localStorage read & write
//[x]  localStorage에 데이터를 저장한다.
//  [x]  메뉴를 추가할때
//  [x]  메뉴를 수정할때
//  [x]  메뉴를 삭제할때
//[x]  localStorage에 있는 데이터를 읽어온다.

// 종류별 메뉴판 관리
//[x]  에스프레소 메뉴판관리
//[x]  프라푸치노 메뉴판관리
//[x]  블렌디드 메뉴판관리
//[x]  티바나 메뉴판관리
//[x]  디저트 메뉴판관리

// 페이지 접근시 최초 데이터 Read & Rendering
//[x]  페이지에 최초로 접근할 때 localStorage에서 에스프레소 메뉴 데이터를 가져온다.
//[x]  에스프레소 메뉴를 페이지에 보이게 한다.

// 품절상태관리
//[] 품절 버튼을 추가한다.
//[] 품절 버튼 클릭시, 클릭한 버튼의 부모노드 하위의 span태그를 찾아 sold-out class를 추가한다.
//[] 품절 버튼 클릭시, localStorage에 상태값이 저장된다.


//DOM요소 선택 함수
const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("menu"));
    }
}

let menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: []
};
let currentCategory = 'espresso';

//페이지 처음 진입시 호출하는 함수
const init = () => {
    if (store.getLocalStorage()) {
        menu = store.getLocalStorage();
    }
    render();
}

//Enter키 입력시 새로고침 방지
const menuForm = $('#menu-form');
menuForm.setAttribute('onsubmit', "return false;");

//메뉴 리스트 렌더링 함수
const render = () => {
    const template = menu[currentCategory].map((menuItem, index) => {
        return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
        </li>`
    }).join(''); //li태그의 배열을 join을 통해 하나의 문자열로 합친다.

    $('#menu-list').innerHTML = template;
    $('.menu-count').textContent = `총 ${$('#menu-list').childElementCount}개`;
}

//페이지 초기세팅
init();

//신규메뉴 추가 함수
const addMenuName = () => {
    if ($('#menu-name').value.trim() === "") {
        alert('값을 입력해주세요');
        return;
    }
    menu[currentCategory].push({ name: $('#menu-name').value });
    store.setLocalStorage(menu);
    render();
    $('#menu-name').value = "";
}

//엔터키를 누르면 메뉴추가
$('#menu-name').addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    if (event.isComposing !== true) addMenuName();
})

//확인버튼을 클릭하면 메뉴추가
const menuSubmitBtn = $('#menu-submit-button');
menuSubmitBtn.addEventListener('click', () => {
    addMenuName();
});

const updateMenu = (e) => {
    const menuId = e.target.parentNode.dataset.menuId;
    const menuName = e.target.parentNode.querySelector('.menu-name');
    menuName.textContent = window.prompt('메뉴명을 수정하세요', menuName.textContent);
    menu[currentCategory][menuId].name = menuName.textContent;
    store.setLocalStorage(menu);
}

const removeMenu = (e) => {
    const deleteMenu = e.target.parentNode;
    const menuId = deleteMenu.dataset.menuId;
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (result === true) {
        deleteMenu.remove();
        menu[currentCategory].splice(menuId, 1);
        store.setLocalStorage(menu);
    }
}

// 메뉴 수정,삭제 <-이벤트위임(Delegation) 사용
$('#menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) updateMenu(e);
    else if (e.target.classList.contains('menu-remove-button')) removeMenu(e);
});


//네비게이션 태그의 버튼 클릭이벤트 추가 <-이벤트위임(Delegation) 사용
$('nav').addEventListener('click', (e) => {
    const isCategoryButton = e.target.classList.contains('cafe-category-name');
    if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        currentCategory = categoryName;
        $('#category-title').textContent = `${e.target.textContent} 메뉴 관리`;
        render();
    }
})