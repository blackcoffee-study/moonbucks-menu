import { deleteData, editData, getData, postData, soldOutData } from './api.js';
import Header from './Header.js'
import Main from './Main.js'

export default function App($app) {
  this.state = {
    currentCategory: 'espresso',
    currentText: '☕ 에스프레소',
    currentCategoryMenuItems: []
  }


  this.getLocalStorage = (meunItems) => {
    const strMenu = localStorage.getItem(meunItems);
    if (strMenu !== null) return JSON.parse(strMenu);
  }


  this.setLocalStorage = (state) => {
    localStorage.setItem('menuItems', JSON.stringify(state));
  }


  const getItems = currentCategory => {
    getData(currentCategory).then(res => {
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
      getItems(this.state.currentCategory)
    }
  });


  const main = new Main({
    $app,
    initialState: { ...this.state },
    updateMenuItems: async (name) => {
      await postData(this.state.currentCategory, name);
      getItems(this.state.currentCategory);

    },
    editMenuItems: async (menuId, edited) => {
      await editData(this.state.currentCategory, menuId, edited);
      getItems(this.state.currentCategory);
    },
    deleteMenuItems: async (menuId) => {
      await deleteData(this.state.currentCategory, menuId);
      getItems(this.state.currentCategory);

    },
    checkSoldOut: async (menuId) => {
      await soldOutData(this.state.currentCategory, menuId);
      getItems(this.state.currentCategory);
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
    getData(this.state.currentCategory).then(res => {
      this.setState({ ...this.state, currentCategoryMenuItems: res })
    });
  }
  init()
}