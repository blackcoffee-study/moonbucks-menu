import MenuInput from './MenuInput.js';
import MenuList from './MenuList.js';
import Count from './Count.js';

function App() {
  this.menuTitle = [];

  const menuList = new MenuList();
  const count = new Count();

  this.setState = updatedMenuList => {
    this.menuTitle = updatedMenuList;
  };
  this.render = () => {
    //TODO: 필요한가?
    menuList.render(this.menuTitle);
  };

  this.onAdd = newMenu => {
    this.setState([...this.menuTitle, newMenu]);
    menuList.addNewMenu(newMenu);
    count.updateCount({ menuCount: this.menuTitle.length });
  };

  new MenuInput({ onAdd: this.onAdd });
}

export default App;
