const MENU = "menu";

const loadMenu = () => {
  const loadedMenu = localStorage.getItem(MENU);
  return loadedMenu !== null ? JSON.parse(loadedMenu) : [];
};

export const getMenu = (category) => {
  const fiterMenu = loadMenu().filter((menu) => menu.category === category);
  return fiterMenu;
};

export const postMenu = (menu) => {
  const addedMenu = [...loadMenu(), menu];
  localStorage.setItem(MENU, JSON.stringify(addedMenu));
};

export const patchMenu = ({ id, name, isSoldOut }) => {
  const updatedMenu = loadMenu().map((menu) => {
    if (menu.id === id) return { ...menu, name, isSoldOut };

    return menu;
  });
  localStorage.setItem(MENU, JSON.stringify(updatedMenu));
};

export const deleteMenuById = (id) => {
  const deletedMenu = loadMenu().filter((menu) => menu.id !== id);
  localStorage.setItem(MENU, JSON.stringify(deletedMenu));
};
