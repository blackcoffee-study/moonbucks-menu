export default function MenuList({
  $target,
  initialState,
  onUpdate,
  onDelete,
}) {
  this.$target = $target
  this.state = initialState

  this.$target.addEventListener('click', (e) => {
    const $updateBtn = e.target.closest('#update-btn')
    const $deleteBtn = e.target.closest('#delete-btn')

    if ($updateBtn) {
      const { index } = $updateBtn.dataset
      onUpdate(parseInt(index))
    }

    if ($deleteBtn) {
      const { index } = $deleteBtn.dataset
      onDelete(parseInt(index))
    }
  })

  this.render = () => {
    const { menuList } = this.state

    this.$target.innerHTML = menuList.map((name, index) =>
      `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${name}</span>
        <button
          id="update-btn"
          data-index=${index}
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          id="delete-btn"
          data-index=${index}
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`)
      .join('')
  }

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render()
}