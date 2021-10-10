import App from './states/App.js'
import Menu from './states/Menu'

class Renderer {
  constructor (app) {
    this.app = app
  }

  render () {
    this._render()
  }

  _render () {
    console.log('must be override')
  }
}

class DOMRenderer extends Renderer {
  constructor (parent, app) {
    super(app)
    this.$parent = parent
    this.render()
    this.addMenuEvent()
  }

  addMenuEvent () {
    const $inputMenu = this.$parent.querySelector('#espresso-menu-form')

    $inputMenu.addEventListener('submit', this.handleAddMenu)
  }

  handleAddMenu = (e) => {
    e.preventDefault();
    const name = e.target.elements['espressoMenuName'].value.trim()

    if (!name.length) return

    this.app.addMenu(Menu.get(this.app.size, name))

    this.render();
  }



  _render () {


  }

}

new DOMRenderer(document, new App())
