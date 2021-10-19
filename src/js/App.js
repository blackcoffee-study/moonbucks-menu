import MenuInput from './component/MenuInput.js';
import MenuList from './component/MenuList.js';
import MenuNav from './component/MenuNav.js';
import MenuTitle from './component/MenuTitle.js';
import { $, $$ } from './utils.js';
import {setLocaStorage, getLocalStorage, getMenuList, setMenuList} from './store.js';

export default class App {
  $target;
  constructor($target) {
    this.$target = $target;
    this.setup();
  }
  setup() {
    const data = {
      'category' : 'espresso',
      'espresso' : [],
      'frappuccino' :[],
      'blended' : [],
      'teavana' :[],
      'desert' :[]
    }
    this.$state = getLocalStorage('menu') ?? setLocaStorage('menu', data)
    this.mounted();
  }
  mounted() {
    const {$state, onChangeCategory, onAddMenu} =this;

    this.menuNav = new MenuNav($('#menu-nav'), {
      $state,
      onChangeCategory : onChangeCategory.bind(this),
    });
    this.menuTitle = new MenuTitle($('#sub-title'), {
      $state
    });
    this.menuInput = new MenuInput($('#espresso-menu-form'), {
      $state,
      onAddMenu : onAddMenu.bind(this),
    });
    this.menuList = new MenuList($('#espresso-menu-list'), {
      $state
    });
  }
  onChangeCategory(category){
    console.log(category);
    this.$state.category = category;
    console.log(this.$state);
    setLocaStorage('menu',this.$state);
    this.menuTitle.setState(getLocalStorage('menu'));
    this.menuList.setState(getLocalStorage('menu'));
  }
  onAddMenu(category, content){
    const id = Math.random().toString(36).substr(2,12)
   
    const List = getMenuList(category);
    List.push({
      id,
      isSoldout : true,
      name : content,
    })
    setMenuList(category, List);  
    this.menuTitle.setState(getLocalStorage('menu'));
    this.menuList.setState(getLocalStorage('menu'));
  }


  onSoldoutMenu(){

  }

  onDeleteMenu(){

  }
  
}
