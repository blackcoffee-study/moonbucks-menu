export const generateID = menuItems =>
  menuItems.length === 0 ? 1 : menuItems[menuItems.length - 1].id + 1;
