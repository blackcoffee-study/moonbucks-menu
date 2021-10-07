'use strict'

const $espressoMenuSubmitBtn = document.querySelector(
  '#espresso-menu-submit-button'
)
const $espressoMenuName = document.querySelector('#espresso-menu-name')
const $espressoMenuList = document.querySelector('#espresso-menu-list')
const $espressoMenuForm = document.querySelector('#espresso-menu-form')

// 메뉴 추가
const createNewMenu = input => {
  const id = Date.now()
  const $espressoMenu = document.createElement('li')
  $espressoMenu.setAttribute('class', 'menu-list-item d-flex items-center py-2')
  $espressoMenu.setAttribute('data-id', id)

  $espressoMenu.innerHTML = `
      <span class="w-100 pl-2 menu-name">${input}</span>
      <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          data-id=${id}
      >
          수정
      </button>
      <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          data-id=${id}
      >
          삭제
      </button>
    `
  return $espressoMenu
}

const addEspressoMenu = () => {
  const input = $espressoMenuName.value

  if (input === '') {
    return
  }

  const newMenu = createNewMenu(input)
  $espressoMenuList.appendChild(newMenu)
  $espressoMenuName.value = ''
}

$espressoMenuSubmitBtn.addEventListener('click', () => {
  addEspressoMenu()
})

$espressoMenuForm.addEventListener('submit', e => {
  e.preventDefault()
  addEspressoMenu()
})

// 메뉴 수정, 삭제
const editMenu = id => {
  const $toBeEdited = document
    .querySelector(`.menu-list-item[data-id="${id}"]`)
    .querySelector('.menu-name')

  const menuName = window.prompt('수정할 메뉴명을 입력해주세요')
  if (menuName === null || menuName === '') {
    return
  }
  $toBeEdited.innerText = menuName
}

const deleteMenu = id => {
  const $toBeDeleted = document.querySelector(
    `.menu-list-item[data-id="${id}"]`
  )
  if (confirm('메뉴를 삭제하시겠습니까?')) {
    $toBeDeleted.remove()
  }
}

$espressoMenuList.addEventListener('click', e => {
  const target = e.target
  const id = e.target.dataset.id

  if (id && target.matches('.menu-edit-button')) {
    editMenu(id)
  } else if (id && target.matches('.menu-remove-button')) {
    deleteMenu(id)
  }
})
