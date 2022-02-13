const menuForm = document.querySelector("#espresso-menu-form");
const menuInput = document.querySelector("#espresso-menu-name");
const btnSubmit= document.querySelector("#espresso-menu-submit-button");
const menuList = document.querySelector("#espresso-menu-list");
const numberOfMenu = document.querySelector('.menu-count');

function countMenu(){
	let count = menuList.childElementCount
	numberOfMenu.innerHTML=`총 ${count}개`
}


function createNewMenu(name){
	menuList.innerHTML += `<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${name}</span>
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
	countMenu()
}

btnSubmit.addEventListener("click", (e) => {
	e.preventDefault();
	menuInput.value.trim() && createNewMenu(menuInput.value);
	menuInput.value = "";
});

menuForm.addEventListener("submit", (e) => {
	e.preventDefault();
	menuInput.value.trim() && createNewMenu(menuInput.value)
	menuInput.value=''
});

function deleteMenu(e){
  const menuLi = e.target.closest('li')
    if (confirm('정말로 삭제하시겠습니까?')){
      menuList.removeChild(menuLi)
      countMenu()
    }
}

menuList.addEventListener('click', e => {
  if(e.target.classList.contains('menu-remove-button')) return deleteMenu(e)
})