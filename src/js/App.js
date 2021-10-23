import { $, getStorageItem, setStorageItem } from './utils.js'
import MenuList from './MenuList.js'
import MenuForm from './MenuForm.js'

export default function App ({ $target }) {
  this.$target = $target
  this.state = {
    menuList: getStorageItem('espresso').menuList || [],
  }

  const menuForm = new MenuForm({
    $target: $('#espresso-menu-form'),
    onAdd: (e) => {
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

      setStorageItem('moon-bucks', { menuList: this.state.menuList })
    }
  })

  const menuList = new MenuList({
    $target: $('#espresso-menu-list'),
    initialState: this.state,
    onUpdate: (index) => {
      const updatedMenuName = prompt('메뉴명을 수정하세요.')
      if (updatedMenuName === '') {
        return
      }

      const newMenuList = [ ...this.state.menuList ]
      newMenuList[index] = updatedMenuName

      this.setState({ menuList: newMenuList })

      setStorageItem('espresso', { menuList: this.state.menuList })
    },
    onDelete: (index) => {
      const isDeleteConfirm = confirm()

      if (!isDeleteConfirm) {
        return
      }

      const newMenuList = [ ...this.state.menuList ]
      newMenuList.splice(index, 1)
      this.setState({ menuList: newMenuList })
    }
  }) 

  this.setState = (nextState) => {
    this.state = nextState
    menuList.setState(this.state)
  }
}
