import MenuInput from './component/MenuInput.js';
import MenuList from './component/MenuList.js';
import MenuNav from './component/MenuNav.js';
import MenuTitle from './component/MenuTitle.js';
import { $, getRandomID } from './utils.js';
import { coffeeAPI } from './API/api.js';


export default class App {
  $target;
  constructor($target) {
    this.$target = $target;
    this.setup();
  }
  async setup() {
    this.category ='espresso';
    this.$state = await coffeeAPI.getMenuList(this.category);
    this.mounted();
  }
  async setState(category){
    this.$state =  await coffeeAPI.getMenuList(category);
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
    this.setState(this.category);
  }

  async onAddMenu(content){
    const result = await coffeeAPI.postMenu(this.category, {name:content})
    
    if(result.status===400){
      alert("중복되는 메뉴입니다.");
      return;
    }
    if(!result.ok){
      alert(result.statusText)
    }
    if(result) this.setState(this.category);
  }

  async onSoldoutMenu(id){
    const result = await coffeeAPI.soldoutMenu(this.category, id)
    if(result) this.setState(this.category);
  }

  async onDeleteMenu(id){
    const result = await coffeeAPI.deleteMenu(this.category, id);
    if(!result.ok){
      alert(result.statusText);
    }
    if(result.ok) this.setState(this.category);
  }

  async onUpdateMenu(id, data){
    const result = await coffeeAPI.updateMenu(this.category, id, data);
    if(result) this.setState(this.category);
  }
}
