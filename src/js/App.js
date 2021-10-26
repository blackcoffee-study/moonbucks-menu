import { deleteData, editData, getData, postData } from './api.js';
import Header from './Header.js'
import Main from './Main.js'

export default function App($app) {
  this.state = {
    // espresso: { key: 'espresso', menuItems: [], text: '☕ 에스프레소' },
    // frappuccino: { key: 'frappuccino', menuItems: [], text: '🥤 프라푸치노' },
    // blended: { key: 'blended', menuItems: [], text: '🍹 블렌디드' },
    // teavana: { key: 'teavana', menuItems: [], text: '🫖 티바나' },
    // desert: { key: 'desert', menuItems: [], text: '🍰 디저트' },
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
    getData(this.state.currentCategory).then(res => {
      console.log(res)
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
    // initialState: this.state[this.state.currentCategory],
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
    // main.setState(this.state[this.state.currentCategory])
    console.log(this.state)
    main.setState({
      ...this.state
    })
  };


  const init = async () => {
    header.render();
    // const result = this.getLocalStorage('menuItems');
    // if (!result) {
    //   this.setLocalStorage('menuItems', this.state)
    //   this.setState({ ...this.state })
    // } else {
    //   this.setState({ ...result, currentCategory: this.state.currentCategory })
    // }
    getData(this.state.currentCategory).then(res => {
      console.log(res)
      this.setState({ ...this.state, currentCategoryMenuItems: res })
      console.log(this.state)
    })

  }
  init()
}