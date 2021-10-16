document.addEventListener("DOMContentLoaded", app);

function qs(selector, scope = document) {
  return scope.querySelector(selector)
}
function gi(selector, scope = document) {
  return scope.getElementById(selector)
}

function app() {
  const submitBtn = qs('.input-submit')
  const addMenuInput = qs('.input-field')
  const menuUl = gi('espresso-menu-list')
  const menuForm = gi('espresso-menu-form')
  let listData = []

  menuForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 등록
  const addMenuList = () => {
    if (addMenuInput.value === '') return

    const nowDate = new Date();
    const idDate = `${nowDate.getFullYear()}` + `${nowDate.getMonth() + 1}` + `${nowDate.getDate()}` + `${nowDate.getHours()}` + `${nowDate.getMinutes()}`;
    const id = Math.floor(Number(idDate) + Math.random() * Number(idDate));

    listData.push({ id, name: addMenuInput.value })
    menuUl.innerHTML = getList(listData)
    addMenuInput.value = ''
  }
  submitBtn.addEventListener('click', addMenuList)
  addMenuInput.addEventListener('keyup', function (e) {
    if (e.key === "Enter") {
      addMenuList()
      return;
    }
  })


  document.addEventListener('click', function (e) {

    // 삭제
    if (e.target.classList.contains('menu-remove-button')) {
      if (confirm('삭제 하시겠습니까?')) {
        listData = listData.filter((item) => {
          return item.id !== Number(e.target.parentNode.dataset.id)
        });
        menuUl.innerHTML = getList(listData)
        return
      }
      alert('취소됐습니다.')
    }

    // 수정
    if (e.target.classList.contains('menu-edit-button')) {
      const editText = prompt('수정할 텍스트를 입력하세요.', '내용')
      listData = listData.map(item => {
        if (item.id === Number(e.target.parentNode.dataset.id)) {
          item.name = editText;
        }
        return item
      })
      menuUl.innerHTML = getList(listData)
    }

  })

  const getList = (data = []) => {
    return data.map(getItem).join("")
  }

  const getItem = ({ id, name }) => {
    return `
    <li class="menu-list-item d-flex items-center py-2" data-id="${id}">
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
    </li>
    `
  }
}



