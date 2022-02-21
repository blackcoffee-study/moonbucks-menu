class MainModel {

  getEspressoMenu() {
    return JSON.parse(localStorage.getItem("ESPRESSO"));
  }

  addEspressoMenu(espressoMenuName) {
    const prevEspressoMenuList = this.getEspressoMenu();
    prevEspressoMenuList 
    ? localStorage.setItem("ESPRESSO", JSON.stringify([espressoMenuName, ...prevEspressoMenuList]))
    : localStorage.setItem("ESPRESSO", JSON.stringify([espressoMenuName]))
  }

  removeEspressoMenu(espressoMenuName) {
    const removeEspressoMenuList = this.getEspressoMenu()
      .filter((espressoMenu) => espressoMenu !== espressoMenuName);
    localStorage.setItem("ESPRESSO", JSON.stringify([...removeEspressoMenuList]));
  }

  editEspressoMenu(editEspressoMenuInfo) {
    const prevEspressoMenuList = this.getEspressoMenu();
    const espressoMenuIndex = prevEspressoMenuList
      .findIndex((espressoMenu) => espressoMenu === editEspressoMenuInfo[0]);
    prevEspressoMenuList.splice(espressoMenuIndex, 1, editEspressoMenuInfo[1]);
    localStorage.setItem("ESPRESSO", JSON.stringify([...prevEspressoMenuList]));
  }

}

export default MainModel;