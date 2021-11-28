const $ = (selector) => document.querySelector(selector)

const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu))
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('menu'))
  },
}

function App() {
  this.menu = []
  this.init = () => {
    if (store.getLocalStorage() && store.getLocalStorage().length > 0) {
      this.menu = store.getLocalStorage()
    }
    render()
  }

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault()
  })

  const render = () => {
    const template = this.menu
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
      })
      .join('')

    $('#espresso-menu-list').innerHTML = template

    updateMenuCount()
  }

  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length
    $('.menu-count').innerText = `총 ${menuCount} 개`
  }

  const addMenuName = () => {
    if ($('#espresso-menu-name').value.trim() === '') {
      alert('값을 입력해주세요.')
      return
    }

    const espressoMenuName = $('#espresso-menu-name').value
    this.menu.push({ name: espressoMenuName })
    store.setLocalStorage(this.menu)

    render()

    $('#espresso-menu-name').value = ''
  }

  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText)
    if (!updatedMenuName) {
      return
    }

    this.menu[menuId].name = updatedMenuName
    store.setLocalStorage(this.menu)
    $menuName.innerText = updatedMenuName
  }

  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const menuId = e.target.closest('li').dataset.menuId
      this.menu.splice(menuId, 1)
      store.setLocalStorage(this.menu)
      e.target.closest('li').remove()

      updateMenuCount()
    }
  }

  $('#espresso-menu-submit-button').addEventListener('click', addMenuName)

  $('#espresso-menu-name').addEventListener('keyup', (e) => {
    if (e.key !== 'Enter') {
      return
    }

    addMenuName()
  })

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e)
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e)
    }
  })
}

const app = new App()
app.init()
