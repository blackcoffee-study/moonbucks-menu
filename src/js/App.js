import Header from './Header.js'
import Main from './Main.js'

export default function App($app) {
  this.state = {
    currentTab: { categoryName: 'espresso', text: '☕ 에스프레소' }
  }
  const header = new Header({
    $app,
    onClick: (categoryName) => {

      this.setState({
        ...this.state,
        currentTab: categoryName
      })
    }
  });
  const main = new Main({
    $app,
    initialState: this.state.currentTab
  });


  this.setState = (nextState) => {
    this.state = nextState;
    main.setState(this.state.currentTab)

  };


  const init = () => {
    header.render();
    this.setState({
      ...this.state
    })
  }
  init()
}