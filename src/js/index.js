'use strict'

// 에스프레소 메뉴 추가
const $espressoMenuSubmitBtn = document.querySelector(
  '#espresso-menu-submit-button'
)
const $espressoMenuName = document.querySelector('#espresso-menu-name')
const $espressoMenuList = document.querySelector('#espresso-menu-list')
const $espressoMenuForm = document.querySelector('#espresso-menu-form')

const addEspressoMenu = () => {
  if ($espressoMenuName.value === '') {
    return
  }

  const $espressoMenu = document.createElement('li')
  $espressoMenu.setAttribute('class', 'menu-list-item d-flex items-center py-2')
  $espressoMenu.innerHTML = `
      <span class="w-100 pl-2 menu-name">${$espressoMenuName.value}</span>
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
    `
  $espressoMenuList.appendChild($espressoMenu)
}

$espressoMenuSubmitBtn.addEventListener('click', () => {
  addEspressoMenu()
  $espressoMenuName.value = ''
})

$espressoMenuForm.addEventListener('submit', e => {
  e.preventDefault()
  addEspressoMenu()
  $espressoMenuName.value = ''
})
