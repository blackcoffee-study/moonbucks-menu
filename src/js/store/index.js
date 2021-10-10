const store = {
  setLocalStorage(menu) {
    //JSON 저장할 때 JSON.stringify
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    //메뉴 아이템을 하나의 문자열로 가져온 것을 JSON 객체로 변환시키는것 JSON.parse()
    return JSON.parse(localStorage.getItem("menu"));
  },
};

export default store;
