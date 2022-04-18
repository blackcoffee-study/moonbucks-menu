const store = {
  // 로컬스토리지 셋터
  setLocalStorage(menu) {
    // 로컬스토리지에는 문자열로만 저장할 수 있다. (객체 불가능) => 문자열로 파싱해줘야 한다.
    // JSON.stringify 메서드로 객체를 JSON 문자열로 파싱 할 수 있다.
    //                    key,  value
    localStorage.setItem("menu", JSON.stringify(menu));
  },

  // 로컬스토리지 겟터
  getLocalStorage() {
    // 문자열로 저장된 메뉴를 가져올때는 객체로 가져와야 하기 때문에 문자열에서 다시 객체로 파싱해준다.
    return JSON.parse(localStorage.getItem("menu"));
  },
};

export default store;
