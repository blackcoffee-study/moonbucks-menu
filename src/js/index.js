const inputField = document.getElementById('espresso-menu-name');
const submitButton = document.getElementById('espresso-menu-submit-button');
const menuList = document.getElementById('espresso-menu-list');
const totalCount = document.querySelector('.menu-count');

inputField.addEventListener("keypress", handleEnter);
submitButton.addEventListener("click", handleSubmit);


function handleEnter(event) {
    if(event.key === 'Enter'){
        event.preventDefault();
        
        handleSubmit();
    }
}

function handleSubmit(event){
    const keyword = inputField.value.trim();
    if(keyword.length === 0){
        return;
    }
    addMenu(keyword);
    inputField.value = '';
    updateTotalCount();
}

function addMenu(item){
    menuList.innerHTML += 
    `<li class="menu-list-item d-flex items-center py-2">
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
    setItemEvent();
}
function setItemEvent(){
    const editButtons = document.querySelectorAll('.menu-edit-button');
    const removeButtons = document.querySelectorAll('.menu-remove-button');
    editButtons.forEach((editButton, index) => {
        editButton.addEventListener('click', handleEdit);
        removeButtons[index].addEventListener('click', handleDelete);
    });
}

function handleEdit(event){
    const menuName = event.target.previousElementSibling;
    const newMenuName = prompt('메뉴명을 수정하세요.', menuName.innerText) ?? menuName.innerText;
    menuName.innerText = newMenuName;
}

function handleDelete(event) {
    const wantDelete = confirm('정말 삭제하시겠습니까?');
    if(wantDelete){
        const li = event.target.parentNode;
        li.remove();
        updateTotalCount();
    }
}
function updateTotalCount(){
    const count = menuList.childNodes.length;
    totalCount.innerText = `총 ${count}개`;
} 
