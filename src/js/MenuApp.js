import Component from "./Component";
import MenuList from "./MenuList";
import MenuCount from "./MenuCount";
import MenuNavigation from "./MenuNavigation";

export default class MenuApp extends Component {
    init() {
        this.navKey = 'espresso'
        this.state= {
            selected:-1,
            MenuItems: localStorage.getItem(this.navKey) || [
                    {
                    id:1,
                    text:"text",
                    completed:false
                    }
                ]
        }
    }
    setState(newState) {
        super.setState(newState);
        localStorage.setItem(this.navKey, this.state);
    }

    template(){
       return `
       <div className="d-flex justify-center mt-5 w-100">
    <div className="w-100">
      <header className="my-4">
      </header>
      <main className="mt-10 d-flex justify-center">
        <div className="wrapper bg-white p-10">
          <div className="heading d-flex justify-between">
            <h2 className="mt-1">☕ 에스프레소 메뉴 관리</h2>
            <span className="mr-2 mt-4 menu-count"></span>
          </div>
          <form id="espresso-menu-form">
          </form>
          <ul id="espresso-menu-list" className="mt-3 pl-0"></ul>
        </div>
      </main>
    </div>
  </div>
       `;
    }
    mount(){
        const {onAddMenu, onEditMenu, onCancelEdit, onUpdateMenu, onDeleteMenu, onClickNav, onToggleMenuSoldOut} = this;
        const {selected, MenuItems} = this.state;

        new MenuForm(this.target.querySelector("form#espresso-menu-form"), {
            onAddMenu: onAddMenu.bind(this),
        });
        new MenuNavigation(this.target.querySelector("header"), {
            onClickNav: onClickNav.bind(this)
        });
        new MenuList(this.target.querySelector("ul#espresso-menu-list"), {
            MenuItems,
            selected,
            onEditMenu:onEditMenu.bind(this),
            onCancelEdit:onCancelEdit.bind(this),
            onUpdateMenu: onUpdateMenu.bind(this),
            onDeleteMenu: onDeleteMenu.bind(this),
            onToggleMenuSoldOut: onToggleMenuSoldOut.bind(this),
        });
        new MenuCount(this.target.querySelector("span.menu-count"), {Menucount:this.MenuCount.bind(this)});
    }
    get MenuCount(){
        return this.state.MenuItems.length;
    }
    set navKey(name){
        this.Navkey = name;
    }
    get navKey(){
        return this.Navkey;
    }
    onClickNav(name){
        this.navKey=name;
        this.setState(localStorage.getItem(this.navKey))
    }
    onAddMenu(text){
        const newId = Math.max(this.state.MenuItems.map(menu=>menu.id))+1;
        const newMenu = {id:newId, text, completed:false}
        this.setState({MenuItems:[...this.state.MenuItems,newMenu]});
    }
    onToggleMenuSoldOut(id){
        const CopiedList = [...this.state.MenuItems];
        const index = CopiedList.findIndex(item=>item.id===id);
        CopiedList[index].completed = !CopiedList[index].completed
        this.setState({MenuItems: CopiedList});
    }

    onUpdateMenu(id, text){
        const{selected} = this.state;
        const CopiedMenu = [...this.state.MenuItems];
        const Menuitem = CopiedMenu.find(item=>item.id===id);
        Menuitem.text = text;
        this.setState({MenuItems:CopiedMenu});
    }
    onDeleteMenu(id){
        const {selected} = this.state;
        const CopiedMenu = [...this.state.MenuItems];
        const index = CopiedMenu.findIndex(item=>item.id===id);
        CopiedMenu.splice(index, 1);
        this.setState({MenuItems:CopiedMenu});
    }


}
