import * as D from './dom.js'
import { createItem } from './util.js'

D.createBtn.addEventListener('click', createItem)
D.menuInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    createItem()
  }
})
