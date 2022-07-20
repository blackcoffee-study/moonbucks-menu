import MenuInput from './MenuInput.js';
import MenuList from './MenuList.js';
import Count from './Count.js';

function App() {
  //NOTE: menuInfo라는 이름이 적당한지는 모르겠음
  //내부에 menu title과 id 값을 가진 object들을 요소로 가짐
  this.menuInfo = [];
  this.menuId = 0;
  const menuList = new MenuList();
  const count = new Count();

  this.setState = updatedMenuList => {
    this.menuInfo = updatedMenuList;
  };
  this.render = () => {
    //TODO: 필요한가?
    menuList.render(this.menuInfo);
  };

  this.onAdd = newMenu => {
    this.setState([...this.menuInfo, { title: newMenu, id: this.menuId++ }]);
    menuList.addNewMenu(newMenu, this.menuId);
    count.updateCount({ menuCount: this.menuInfo.length });
  };
  this.onUpdate = id => {
    //TODO: 로직구현
    // this.menuInfo.map(el => {
    //   if (el.id === id) {
    //     el =
    //   }
    // });
    menuList.updateMenu(id);
  };
  this.onDelete = id => {
    this.setState([...this.menuTitle, newMenu]);
    menuList.addNewMenu(newMenu);
    count.updateCount({ menuCount: this.menuTitle.length });
  };
  new MenuInput({ onAdd: this.onAdd });
}

export default App;
