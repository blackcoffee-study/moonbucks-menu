import CustomMenuSet from '../utils/custom-menu-set.js'

export default {
  key: 'menuLists',
  default: {
    "espresso": new CustomMenuSet(),
    "frappuccino": new CustomMenuSet(),
    "blended": new CustomMenuSet(),
    "teavana": new CustomMenuSet(),
    "dessert": new CustomMenuSet(),
  },
}
