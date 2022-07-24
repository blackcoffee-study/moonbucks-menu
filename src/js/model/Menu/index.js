export default class Menu {
  static menuCounter = 0;

  constructor(partialMenu) {
    if (!Reflect.has(partialMenu, 'name')) {
      throw new Error(
        'name property is missing : read the Menu type annotation! but wait, is there any?'
      );
    }
    this.name = partialMenu.name;
    this.id = Menu.menuCounter += 1;
  }
}
