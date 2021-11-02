import { api } from './api.js';
import Header from './Header.js'
import Main from './Main.js'

export default function App($app) {
  this.state = {
    currentCategory: 'espresso',
    currentText: '☕ 에스프레소',
    currentCategoryMenuItems: []
  }


  this.getItems = currentCategory => {
    api.getData(currentCategory).then(res => {
      this.setState({
        ...this.state,
        currentCategoryMenuItems: res
      })
    })
  }


  const header = new Header({
    $app,
    onClick: (categoryName, text) => {
      this.setState({
        ...this.state,
        currentCategory: categoryName,
        currentText: text
      })
      this.getItems(this.state.currentCategory)
    }
  });


  const main = new Main({
    $app,
    initialState: { ...this.state },
    updateMenuItems: async (name) => {
      await api.postData(this.state.currentCategory, name);
      this.getItems(this.state.currentCategory);

    },
    editMenuItems: async (menuId, edited) => {
      await api.editData(this.state.currentCategory, menuId, edited);
      this.getItems(this.state.currentCategory);
    },
    deleteMenuItems: async (menuId) => {
      await api.deleteData(this.state.currentCategory, menuId);
      this.getItems(this.state.currentCategory);

    },
    checkSoldOut: async (menuId) => {
      await api.soldOutData(this.state.currentCategory, menuId);
      this.getItems(this.state.currentCategory);
    }
  });


  this.setState = (nextState) => {
    this.state = nextState;
    main.setState({
      ...this.state
    });
  };


  const init = async () => {
    header.render();
    api.getData(this.state.currentCategory).then(res => {
      this.setState({ ...this.state, currentCategoryMenuItems: res })
    });
  }
  init()
}