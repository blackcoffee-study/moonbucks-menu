
// const inputField = document.getElementById('espresso-menu-name');
// const submitButton = document.getElementById('espresso-menu-submit-button');
// const menuList = document.getElementById('espresso-menu-list');
// const totalCount = document.querySelector('.menu-count');

// inputField.addEventListener("keypress", handleEnter);
// submitButton.addEventListener("click", handleSubmit);


// function handleEnter(event) {
//     if(event.key === 'Enter'){
//         event.preventDefault();
        
//         handleSubmit();
//     }
// }

// function handleSubmit(event){
//     const keyword = inputField.value.trim();
//     if(keyword.length === 0){
//         return;
//     }
//     addMenu(keyword);
//     inputField.value = '';
//     updateTotalCount();
// }

// function addMenu(item){
//     menuList.innerHTML += 
//     `<li class="menu-list-item d-flex items-center py-2">
//     <span class="w-100 pl-2 menu-name">${item}</span>
//     <button
//       type="button"
//       class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
//     >
//       수정
//     </button>
//     <button
//       type="button"
//       class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
//     >
//       삭제
//     </button>
//   </li>`;
//     setItemEvent();
// }
// function setItemEvent(){
//     const editButtons = document.querySelectorAll('.menu-edit-button');
//     const removeButtons = document.querySelectorAll('.menu-remove-button');
//     editButtons.forEach((editButton, index) => {
//         editButton.addEventListener('click', handleEdit);
//         removeButtons[index].addEventListener('click', handleDelete);
//     });
// }

// function handleEdit(event){
//     const menuName = event.target.previousElementSibling;
//     const newMenuName = prompt('메뉴명을 수정하세요.', menuName.innerText) ?? menuName.innerText;
//     menuName.innerText = newMenuName;
// }

// function handleDelete(event) {
//     const wantDelete = confirm('정말 삭제하시겠습니까?');
//     if(wantDelete){
//         const li = event.target.parentNode;
//         li.remove();
//         updateTotalCount();
//     }
// }
// function updateTotalCount(){
//     const count = menuList.childNodes.length;
//     totalCount.innerText = `총 ${count}개`;
// } 

const $ = (selector) => document.querySelector(selector);

function App() {
    const $menuCountElement = document.querySelectorAll('.menu-count');

    const submitMenu = (event) => {
        event.preventDefault();
        const keyword = $('#espresso-menu-name').value.trim();
        if(keyword.length === 0){
            return;
        }
        addMenu(keyword);
        $('#espresso-menu-name').value = '';
        updateTotalCount();
    }
    const addMenu = (menu) => {
        $('#espresso-menu-list').insertAdjacentHTML('beforeend', menuTemplate(menu));
    }
    
    const menuTemplate = (item) => {
        return  `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${item}</span>
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
    </li>`;
    }
    const updateTotalCount = () => {
        const menuCount = $('#espresso-menu-list').childElementCount;
        $('.menu-count').innerText = `총 ${menuCount}개`
    }
    const updateMenu = (e) => {
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updateMenu = prompt('메뉴명을 수정하세요.', $menuName.innerText) ?? '';
        $menuName.innerText = updateMenu.trim().length > 0 ? updateMenu : $menuName.innerText; 
    }
    const removeMenu = (e) => {
        const wantDelete = confirm('정말 삭제하시겠습니까?');
        if(wantDelete){
            e.target.closest('li').remove();
            updateTotalCount();
        }
    }

    $('#espresso-menu-form').addEventListener('submit', submitMenu);
    $('#espresso-menu-list').addEventListener('click', (e)=> {
        if(e.target.classList.contains('menu-edit-button')){
            updateMenu(e);
        }
        if(e.target.classList.contains('menu-remove-button')){
            removeMenu(e);
        }
    })
    
}

App();
