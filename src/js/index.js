import {$, $$} from './utils.js'

function App(){
  const addMenu= () => {
    
    const menuName = $('#espresso-menu-name').value;
    if(menuName === ''){
      alert('빈 값을 추가할 수 없습니다');
      return;
    }  

    const ul =$('#espresso-menu-list');
    ul.insertAdjacentHTML('beforeend',
      `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
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
      </li>` 
    )
    updateCount();
    $('#espresso-menu-name').value = '';
  }

  const editMenu = (e) => {
    const span = e.target.closest("li").querySelector('.menu-name');
    const result = prompt('수정할 정보를 입력해주세요',span.innerText);
    span.innerHTML = result;
  }

  const deleteMenu = (e) => {
    const span = e.target.closest("li").querySelector('.menu-name');
    const result = confirm('정말로 지우시겠습니까?');
    if(result){//삭제
      e.target.closest("li").remove();
      updateCount();
    }
    return;
  }

  const updateCount = () => {
    const count  = $$('.menu-list-item').length;
    $('.menu-count').innerHTML = `총 ${count}개`
  }

  
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener('click',addMenu);
  

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if(e.key !=='Enter') return;
    addMenu()
  });


  $('#espresso-menu-list').addEventListener('click', (e) => {
    const changeMenu = e.target.outerText;
    if(changeMenu==='수정'){
      editMenu(e)
      return 
    }
    if(changeMenu==='삭제'){
      deleteMenu(e);
      return 
    }
  });

  
}

App();