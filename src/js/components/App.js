import MenuInput from './MenuInput.js';
import MenuList from './MenuList.js';
import Count from './Count.js';

function App() {
  //NOTE: menuInfo라는 이름이 적당한지는 모르겠음
  //내부에 menu title과 id 값을 가진 object들을 요소로 가짐
  this.menuInfo = [];
  this.menuId = 0;

  this.setState = updatedMenuList => {
    this.menuInfo = updatedMenuList;
  };
  this.render = () => {
    //TODO: 필요한가?
  };

  this.onUpdate = (id, updatedMenu) => {
    for (let i = 0; i < this.menuInfo.length; i++) {
      if (this.menuInfo[i].id.toString() === id.toString()) {
        this.menuInfo[i].title = updatedMenu;
        break;
      }
    }
  };

  this.onDelete = id => {
    let idx = this.menuInfo.findIndex(el => el.id === id * 1);
    this.menuInfo.splice(idx, 1);
  };

  const menuList = new MenuList({ onUpdate: this.onUpdate, onDelete: this.onDelete });
  const count = new Count();

  this.onAdd = newMenu => {
    this.setState([...this.menuInfo, { title: newMenu, id: this.menuId++ }]);
    menuList.addNewMenu(newMenu, this.menuId);
    count.updateCount({ menuCount: this.menuInfo.length });
  };

  new MenuInput({ onAdd: this.onAdd });
}

export default App;
