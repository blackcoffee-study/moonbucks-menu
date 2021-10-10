const $form = document.getElementById('espresso-menu-form')
const $button = document.getElementById('espresso-menu-submit-button')

const onUpdate = () => {
  const updatedMenuName = prompt('메뉴명을 수정하세요.')
}

const onDelete = () => {
  console.log('delete')
}

const onSubmit = (e) => {
  e.preventDefault()

  const $input = document.getElementById('espresso-menu-name')
  const { value } = $input
  const $menuName = document.createElement('li')

  if (value === '') {
    return
  }

  const $name = document.createElement('span')
  $name.innerText = value
  $menuName.appendChild($name)

  const $updateBtn = document.createElement('button')
  $updateBtn.innerText = '수정'
  $updateBtn.addEventListener('click', (e) => onUpdate(e))
  $menuName.appendChild($updateBtn)

  const $deleteBtn = document.createElement('button')
  $deleteBtn.innerText = '삭제'
  $deleteBtn.addEventListener('click', (e) => onDelete(e))
  $menuName.appendChild($deleteBtn)

  $input.value = ''

  const $menuList = document.getElementById('espresso-menu-list')
  $menuList.appendChild($menuName)
}

$form.addEventListener('submit', (e) => onSubmit(e))
$button.addEventListener('click', (e) => onSubmit(e))
