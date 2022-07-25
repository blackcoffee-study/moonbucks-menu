import * as D from './dom.js'
import { createMenu, getInputValue } from './util.js'

// ! 에스프레소 메뉴에 새로운 메뉴 추가

D.createBtn.addEventListener('click', () => createMenu(getInputValue()))
