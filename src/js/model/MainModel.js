class MainModel {

  getEspressoMenu(categoryName) {
    return JSON.parse(localStorage.getItem(`${categoryName}`));
  }

  addEspressoMenu(espressoMenuName, categoryName) {
    const prevEspressoMenuList = this.getEspressoMenu(categoryName);
    prevEspressoMenuList 
    ? localStorage.setItem(`${categoryName}`, JSON.stringify([{name: espressoMenuName, soldout: false}, ...prevEspressoMenuList]))
    : localStorage.setItem(`${categoryName}`, JSON.stringify([{name: espressoMenuName, soldout: false}]))
  }

  removeEspressoMenu(espressoMenuName, categoryName) {
    const removeEspressoMenuList = this.getEspressoMenu()
      .filter((espressoMenu) => espressoMenu.name !== espressoMenuName);
    localStorage.setItem(`${categoryName}`, JSON.stringify([...removeEspressoMenuList]));
  }

  editEspressoMenu(editEspressoMenuInfo, categoryName) {
    const editEspressoMenu = this.getEspressoMenu()
      .map((espressoMenu) => espressoMenu.name === editEspressoMenuInfo[0] 
        ? {name: espressoMenu.name = editEspressoMenuInfo[1], soldout: espressoMenu.soldout} 
        : espressoMenu);
    localStorage.setItem(`${categoryName}`, JSON.stringify([...editEspressoMenu]));
  }

  soldoutEspressMenu(espressoMenuName, categoryName) {
    const soldoutEspressMenu = this.getEspressoMenu()
      .map((espressoMenu) => espressoMenu.name === espressoMenuName 
      ? espressoMenu.soldout
        ? {name: espressoMenu.name, soldout: espressoMenu.soldout = false}
        : {name: espressoMenu.name, soldout: espressoMenu.soldout = true}
      : espressoMenu);
    localStorage.setItem(`${categoryName}`, JSON.stringify([...soldoutEspressMenu]));
  }

}

export default MainModel;