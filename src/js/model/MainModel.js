class MainModel {

  getEspressoMenu() {
    return JSON.parse(localStorage.getItem("ESPRESSO"));
  }

  addEspressoMenu(espressoMenuName) {
    const prevEspressoMenuList = this.getEspressoMenu();
    prevEspressoMenuList 
    ? localStorage.setItem("ESPRESSO", JSON.stringify([{name: espressoMenuName, soldout: false}, ...prevEspressoMenuList]))
    : localStorage.setItem("ESPRESSO", JSON.stringify([{name: espressoMenuName, soldout: false}]))
  }

  removeEspressoMenu(espressoMenuName) {
    const removeEspressoMenuList = this.getEspressoMenu()
      .filter((espressoMenu) => espressoMenu.name !== espressoMenuName);
    localStorage.setItem("ESPRESSO", JSON.stringify([...removeEspressoMenuList]));
  }

  editEspressoMenu(editEspressoMenuInfo) {
    const editEspressoMenu = this.getEspressoMenu()
      .map((espressoMenu) => espressoMenu.name === editEspressoMenuInfo[0] 
        ? {name: espressoMenu.name = editEspressoMenuInfo[1], soldout: espressoMenu.soldout} 
        : espressoMenu);
    localStorage.setItem("ESPRESSO", JSON.stringify([...editEspressoMenu]));
  }

  soldoutEspressMenu(espressoMenuName) {
    const soldoutEspressMenu = this.getEspressoMenu()
      .map((espressoMenu) => espressoMenu.name === espressoMenuName 
      ? espressoMenu.soldout
        ? {name: espressoMenu.name, soldout: espressoMenu.soldout = false}
        : {name: espressoMenu.name, soldout: espressoMenu.soldout = true}
      : espressoMenu);
    localStorage.setItem("ESPRESSO", JSON.stringify([...soldoutEspressMenu]));
  }

}

export default MainModel;