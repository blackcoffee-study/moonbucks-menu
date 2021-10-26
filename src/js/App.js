import Header from './Header.js'
import Main from './Main.js'

export default function App($app) {
  this.state = {
    espresso: { key: 'espresso', menuItems: [], text: '☕ 에스프레소' },
    frappuccino: { key: 'frappuccino', menuItems: [], text: '🥤 프라푸치노' },
    blended: { key: 'blended', menuItems: [], text: '🍹 블렌디드' },
    teavana: { key: 'teavana', menuItems: [], text: '🫖 티바나' },
    desert: { key: 'desert', menuItems: [], text: '🍰 디저트' },
    currentCategory: 'espresso'
  }

  this.getLocalStorage = (meunItems) => {

    const strMenu = localStorage.getItem(meunItems);
    if (strMenu !== null) return JSON.parse(strMenu);
  }

  this.setLocalStorage = (menuItems, state) => {
    localStorage.setItem('menuItems', JSON.stringify(state));
  }

  const header = new Header({
    $app,
    onClick: (categoryName) => {
      this.setState({
        ...this.state,
        currentCategory: categoryName
      })
    }
  });

  const main = new Main({
    $app,
    initialState: this.state[this.state.currentCategory],
    updateMenuItems: (categoryName, newMenuItems) => {
      this.setState({
        ...this.state,
        [this.state.currentCategory]: {
          ...this.state[categoryName],
          menuItems: newMenuItems.menuItems
        },
        currentCategory: categoryName
      })

      this.setLocalStorage('menuItems', this.state);
    }
  });


  this.setState = (nextState) => {
    this.state = nextState;
    main.setState(this.state[this.state.currentCategory])
  };


  const init = async () => {
    header.render();
    const result = this.getLocalStorage('menuItems');
    if (!result) {
      this.setLocalStorage('menuItems', this.state)
      this.setState({ ...this.state })
    } else {
      this.setState({ ...result, currentCategory: this.state.currentCategory })
    }
  }
  init()
}