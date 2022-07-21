import MenuInput from './MenuInput.js';
import MenuList from './MenuList.js';
import Count from './Count.js';

function App() {
  // NOTE:
  // enuInfo라는 이름이 적당한지는 모르겠음
  // 내부에 menu title과 id 값을 가진 object들을 요소로 가짐
  this.menuInfo = [];
  this.menuId = 0;

  this.setState = updatedMenuList => {
    this.menuInfo = updatedMenuList;
  };

  this.onUpdate = (id, updatedMenu) => {
    const updated = this.menuInfo.map(el => (el.id * 1 == id * 1 ? { title: updatedMenu, id: id * 1 } : el));
    this.setState(updated);
  };

  this.onDelete = id => {
    const deletedList = this.menuInfo.filter(el => el.id.toString() !== id.toString());
    this.setState(deletedList);
  };

  const menuList = new MenuList({ onUpdate: this.onUpdate, onDelete: this.onDelete });
  const count = new Count();

  this.onAdd = newMenu => {
    menuList.addMenu(newMenu, this.menuId);
    this.setState([...this.menuInfo, { title: newMenu, id: this.menuId++ }]);
    count.updateCount({ menuCount: this.menuInfo.length });
  };

  new MenuInput({ onAdd: this.onAdd });
}

export default App;
