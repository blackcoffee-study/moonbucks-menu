import { deleteData, editData, getData, postData } from './api.js';
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
    updateMenuItems: async (categoryName, newMenuItems, name) => {

      this.setState({
        ...this.state,
        currentCategoryMenuItems: [...newMenuItems]
      })
      postData(this.state.currentCategory, name)
        .then(res => {
        })
      getItems(this.state.currentCategory)
    },
    editMenuItems: async (origin, edited) => {
      const id = this.state.currentCategoryMenuItems.find(el => el['name'] === origin).id;

      editData(this.state.currentCategory, id, edited)
      getItems(this.state.currentCategory)
    },
    deleteMenuItems: async (menuName) => {

      const id = this.state.currentCategoryMenuItems.find(el => el.name === menuName).id;
      deleteData(this.state.currentCategory, id);
      getItems(this.state.currentCategory)
    }
  });


  this.setState = (nextState) => {
    this.state = nextState;
    main.setState({
      ...this.state
    })
  };


  const init = async () => {
    header.render();
    getData(this.state.currentCategory).then(res => {
      this.setState({ ...this.state, currentCategoryMenuItems: res })

    })

  }
  init()
}