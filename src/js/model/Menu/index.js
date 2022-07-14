export default class Menu {
  static menuCounter = 0;

  constructor(particalMenu) {
    if (!Reflect.has(particalMenu, 'name')) {
      throw new Error(
        'name property is missing : read the Menu type annotation! but wait, is there any?'
      );
    }
    this.name = particalMenu.name;
    this.id = Menu.menuCounter += 1;
  }
}
