import { $ } from './utils.js'
import MenuList from './MenuList.js'
import MenuForm from './MenuForm.js'

export default function App ({ $target }) {
  this.$target = $target
  this.state = {
    menuList: [],
  }

  const menuForm = new MenuForm({
    $target: $('#espresso-menu-form'),
    onSubmit: (e) => {
      e.preventDefault()
  
      const $input = $('#espresso-menu-name')
      const { value } = $input
      
      if (value === '') {
        return
      }
  
      this.setState({ 
        ...this.state,
        menuList: [
          ...this.state.menuList,
          value,
        ]
      })
  
      $input.value = ''
    }
  })

  const menuList = new MenuList({
    $target: $('#espresso-menu-list'),
    initialState: this.state,
    onUpdate: () => {
      console.log('update')
      const updatedMenuName = prompt('메뉴명을 수정하세요.')
      $target.innerText = updatedMenuName
    },
    onDelete: () => {
      console.log('delete')
      $target.remove()
    }
  }) 

  this.setState = (nextState) => {
    this.state = nextState
    menuList.setState(this.state)
  }
}
