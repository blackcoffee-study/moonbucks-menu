import { $ } from './utils/dom.js'
import store from './store/index.js'

function App() {
  const ESPRESSO = 'espresso'

  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  }
  this.currentCategory = ESPRESSO

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage()
    }

    render()
    initEventListener()
  }

  const template = (currentCategory) => {
    return currentCategory
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${menuItem.soldOut && 'sold-out'}">
            ${menuItem.name}
          </span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
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
  }

  const preventDefault = (e) => {
    e.preventDefault()
  }

  const render = () => {
    $('#menu-list').innerHTML = template(this.menu[this.currentCategory])

    updateMenuCount()
  }

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length
    $('.menu-count').innerText = `총 ${menuCount} 개`
  }

  const addMenuName = () => {
    if ($('#menu-name').value.trim() === '') {
      alert('값을 입력해주세요.')

      return
    }

    const menuName = $('#menu-name').value
    this.menu[this.currentCategory].push({ name: menuName })
    store.setLocalStorage(this.menu)

    render()

    $('#menu-name').value = ''
  }

  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText)
    if (!updatedMenuName) {
      return
    }

    this.menu[this.currentCategory][menuId].name = updatedMenuName
    store.setLocalStorage(this.menu)

    render()
  }

  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const menuId = e.target.closest('li').dataset.menuId
      this.menu[this.currentCategory].splice(menuId, 1)
      store.setLocalStorage(this.menu)

      render()
    }
  }

  const soldOutMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut
    store.setLocalStorage(this.menu)

    render()
  }

  const enterMenuName = (e) => {
    if (e.key !== 'Enter') {
      return
    }

    addMenuName()
  }

  const handleMenuList = (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e)

      return
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e)

      return
    }

    if (e.target.classList.contains('menu-sold-out-button')) {
      soldOutMenu(e)

      return
    }
  }

  const changeCurrentCategory = (e) => {
    const isCategoryButton = e.target.classList.contains('cafe-category-name')
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName
      this.currentCategory = categoryName
      $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`

      render()
    }
  }

  const initEventListener = () => {
    $('#menu-form').addEventListener('submit', preventDefault)
    $('#menu-submit-button').addEventListener('click', addMenuName)
    $('#menu-name').addEventListener('keyup', enterMenuName)
    $('#menu-list').addEventListener('click', handleMenuList)
    $('nav').addEventListener('click', changeCurrentCategory)
  }
}

const app = new App()
app.init()