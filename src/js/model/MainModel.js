class MainModel {

  getMenuList(categoryName) {
    return JSON.parse(localStorage.getItem(categoryName));
  }

  setAddMenu(menuName, categoryName) {
    const prevMenuList = this.getMenuList(categoryName);
    prevMenuList 
    ? localStorage.setItem(categoryName, JSON.stringify([{name: menuName, soldout: false}, ...prevMenuList]))
    : localStorage.setItem(categoryName, JSON.stringify([{name: menuName, soldout: false}]))
  }

  setRemoveMenu(menuName, categoryName) {
    const removeMenu = this.getMenuList(categoryName)
      .filter((menu) => menu.name !== menuName);
    localStorage.setItem(categoryName, JSON.stringify([...removeMenu]));
  }

  setEditMenu(menuInfo, categoryName) {
    const editMenu = this.getMenuList(categoryName)
      .map((menu) => menu.name === menuInfo[0] 
        ? {name: menu.name = menuInfo[1], soldout: menu.soldout} 
        : menu);
    localStorage.setItem(categoryName, JSON.stringify([...editMenu]));
  }

  setSoldoutMenu(menuName, categoryName) {
    const soldoutMenu = this.getMenuList(categoryName)
      .map((menu) => menu.name === menuName 
      ? menu.soldout
        ? {name: menu.name, soldout: menu.soldout = false}
        : {name: menu.name, soldout: menu.soldout = true}
      : menu);
    localStorage.setItem(categoryName, JSON.stringify([...soldoutMenu]));
  }

}

export default MainModel;