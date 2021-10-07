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
  const id = Date.now()
  const $espressoMenu = document.createElement('li')
  $espressoMenu.setAttribute('class', 'menu-list-item d-flex items-center py-2')
  $espressoMenu.setAttribute('data-id', id)

  $espressoMenu.innerHTML = `
      <span class="w-100 pl-2 menu-name">${$espressoMenuName.value}</span>
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
  $espressoMenuList.appendChild($espressoMenu)
  $espressoMenuName.value = ''
}

$espressoMenuSubmitBtn.addEventListener('click', () => {
  addEspressoMenu()
})

$espressoMenuForm.addEventListener('submit', e => {
  e.preventDefault()
  addEspressoMenu()
})

// 에스프레소 메뉴 수정, 삭제
$espressoMenuList.addEventListener('click', e => {
  const target = e.target
  const id = e.target.dataset.id

  if (id && target.matches('.menu-edit-button')) {
    const $toBeEdited = document
      .querySelector(`.menu-list-item[data-id="${id}"]`)
      .querySelector('.menu-name')

    const menuName = window.prompt('수정할 메뉴명을 입력해주세요')
    if (menuName === null || menuName === '') {
      return
    }
    $toBeEdited.innerText = menuName
  } else if (id && target.matches('.menu-remove-button')) {
    const $toBeDeleted = document.querySelector(
      `.menu-list-item[data-id="${id}"]`
    )
    if (confirm('메뉴를 삭제하시겠습니까?')) {
      $toBeDeleted.remove()
    }
  }
})
