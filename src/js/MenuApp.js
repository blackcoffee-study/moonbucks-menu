import {
  getCategoryMenu,
  postCreateMenu,
  deleteMenu,
  putModifyMenu,
  putSoldOutMenu
} from './utils/api.js'

import { CAFE_CATEGORY } from './utils/constant.js'

import MenuInput from './components/MenuInput.js'
import MenuList from './components/MenuList.js'
import MenuCount from './components/MenuCount.js'
import MenuCategory from './components/MenuCategory.js'

export default function MenuApp(){

  this.handleAddMenu = async(menuName) => {
    await postCreateMenu(this.categoryName, menuName)
    const newMenus = await getCategoryMenu(this.categoryName)
    this.setState(newMenus)
  }

  this.handleDeleteMenu = async(targetId) => {
    await deleteMenu(this.categoryName, targetId)
    const newMenus = await getCategoryMenu(this.categoryName)
    this.setState(newMenus)
  }

  this.handleModifyMenu = async(targetId, newMenuName) => {
    await putModifyMenu(this.categoryName, targetId, newMenuName)
    const newMenus = await getCategoryMenu(this.categoryName)
    this.setState(newMenus)
  }

  this.handleSoldOutMenu = async(targetId) => {
    await putSoldOutMenu(this.categoryName, targetId)
    const newMenus = await getCategoryMenu(this.categoryName)
    this.setState(newMenus)
  }

  this.handleToggleCategory = async(categoryName) => {
    this.categoryName = categoryName
    const newMenus = await getCategoryMenu(this.categoryName)
    this.setState(newMenus)
  }

  this.render = async() => {
    this.categoryName = CAFE_CATEGORY.ESPRESSO
    this.menus = await getCategoryMenu(CAFE_CATEGORY.ESPRESSO)

    // 카테고리 클릭 시 대타이틀, input 타이틀 변경
    // 리스트 불러오기

    this.MenuInput = new MenuInput({
      onAddMenu : this.handleAddMenu.bind(this)
    })
    this.MenuList = new MenuList({
      menus: this.menus,
      category: this.categoryName,
      onDeleteMenu : this.handleDeleteMenu.bind(this),
      onModifyMenu : this.handleModifyMenu.bind(this),
      onSoldOutMenu : this.handleSoldOutMenu.bind(this)
    })
    this.MenuCount = new MenuCount({
      menus: this.menus
    })
    this.MenuCategory = new MenuCategory({
      onToggleCategory : this.handleToggleCategory.bind(this)
    })
  }

  this.setState = (nextState) => {
    this.menus = nextState
    this.MenuList.setState(nextState)
    this.MenuCount.setState(nextState)
  }

  this.render()
}