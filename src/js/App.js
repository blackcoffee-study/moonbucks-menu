import MenuInput from './component/MenuInput.js';
import MenuList from './component/MenuList.js';
import MenuNav from './component/MenuNav.js';
import MenuTitle from './component/MenuTitle.js';
import { $, $$, getRandomID } from './utils.js';
import {setLocaStorage, getLocalStorage, getMenuList, setMenuList, initLocalStorage} from './store.js';



export default class App {
  $target;
  constructor($target) {
    this.$target = $target;
    this.setup();
  }
  setup() {
    this.category ='espresso';
    this.$state = initLocalStorage();
    this.mounted();
  }
  setState(newState){
    this.$state = newState;
    this.mounted();
  }
  mounted() {
    const {$state, category, onChangeCategory, onAddMenu, onSoldoutMenu, onDeleteMenu, onUpdateMenu} =this;

    this.menuNav = new MenuNav($('#menu-nav'), {
      $state,
      category,
      onChangeCategory : onChangeCategory.bind(this),
    });
    this.menuTitle = new MenuTitle($('#sub-title'), {
      $state,
      category
    });
    this.menuInput = new MenuInput($('#espresso-menu-form'), {
      $state,
      category,
      onAddMenu : onAddMenu.bind(this),
    });
    this.menuList = new MenuList($('#espresso-menu-list'), {
      $state,
      category,
      onSoldoutMenu : onSoldoutMenu.bind(this),
      onDeleteMenu : onDeleteMenu.bind(this),
      onUpdateMenu : onUpdateMenu.bind(this),
    });
  }
  onChangeCategory(category){ 
    this.category = category;
    this.setState(getLocalStorage('menu'));
  }

  onAddMenu(content){
    const id = getRandomID();
    const menuList = getMenuList(this.category);
    menuList.push({
      id,
      isSoldout : true,
      name : content,
    })
    setMenuList(this.category, menuList);  
    this.setState(getLocalStorage('menu'));
  }

  onSoldoutMenu(id){
    const menuList = getMenuList(this.category);
    const updateMenuList = menuList.map((element)=>
      element.id == id? {id , isSoldout :!element.isSoldout, name : element.name } : element
    )
    setMenuList(this.category, updateMenuList);
    this.setState(getLocalStorage('menu'))
  }

  onDeleteMenu(id){
    const menuList = getMenuList(this.category);
    const updateMenuList = menuList.filter(menu => menu.id !== id);
    setMenuList(this.category, updateMenuList);
    this.setState(getLocalStorage('menu'))
  }

  onUpdateMenu(id, name){
    const menuList =  getMenuList(this.category);
    const updateMenuList = menuList.map((element) => 
      element.id == id? {id , isSoldout : element.isSoldout, name } : element
    )
    setMenuList(this.category, updateMenuList);
    this.setState(getLocalStorage('menu'))
  }
}
