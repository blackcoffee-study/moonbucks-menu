import { $ } from './utils/dom.js'
import MenuApi from './api/index.js'

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

  this.init = async () => {
    render()

    initEventListener()
  }

  const $menuId = (e) => e.target.closest('li').dataset.menuId

  const template = (currentCategory) => {
    return currentCategory
      .map((menuItem) => {
        return `<li data-menu-id="${
          menuItem.id
        }" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${
            menuItem.isSoldOut && 'sold-out'
          }">
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

  const render = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    )

    $('#menu-list').innerHTML = template(this.menu[this.currentCategory])

    updateMenuCount()
  }

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length
    $('.menu-count').innerText = `총 ${menuCount} 개`
  }

  const addMenuName = async () => {
    if ($('#menu-name').value.trim() === '') {
      alert('값을 입력해주세요.')

      return
    }

    const duplicatedItem = this.menu[this.currentCategory].find(
      (menuItem) => menuItem.name === $('#menu-name').value
    )
    if (duplicatedItem) {
      alert('이미 등록된 메뉴입니다. 다시 입력해주세요.')
      $('#menu-name').value = ''

      return
    }

    const menuName = $('#menu-name').value
    await MenuApi.createMenu(this.currentCategory, menuName)

    render()
    $('#menu-name').value = ''
  }

  const updateMenuName = async (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText)
    if (!updatedMenuName) {
      return
    }

    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, $menuId(e))

    render()
  }

  const removeMenuName = async (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      await MenuApi.deleteMenu(this.currentCategory, $menuId(e))

      render()
    }
  }

  const soldOutMenu = async (e) => {
    await MenuApi.toggleSoldOutMenu(this.currentCategory, $menuId(e))

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

  const changeCategory = (e) => {
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
    $('nav').addEventListener('click', changeCategory)
  }
}

const app = new App()
app.init()
