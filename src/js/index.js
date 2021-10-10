const $form = document.getElementById('espresso-menu-form')
const $button = document.getElementById('espresso-menu-submit-button')

const onSubmit = (e) => {
  e.preventDefault()

  const $input = document.getElementById('espresso-menu-name')
  const { value } = $input
  const $menuName = document.createElement('li')

  if (value === '') {
    return
  }

  $menuName.innerHTML = `
    <span>${value}</span>
    <button>수정</button>
    <button>삭제</button>
  `
  $input.value = ''

  const $menuList = document.getElementById('espresso-menu-list')
  $menuList.appendChild($menuName)
}

$form.addEventListener('submit', (e) => onSubmit(e))
$button.addEventListener('click', (e) => onSubmit(e))
