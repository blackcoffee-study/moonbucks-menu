const toggleMenuStatusInStore = (Store, currentCategory, menuId) => {
  Store[currentCategory] = Store[currentCategory].map((el) => {
    if (el.id === menuId) {
      const status = el.status === "soldOut" ? "onSale" : "soldOut";
      el.status = status;
    }
    return el;
  });
};

const editMenuInStore = (Store, currentCategory, menuId, originName) => {
  const newName = prompt("메뉴명을 수정하세요", originName);
  Store[currentCategory] = Store[currentCategory].map((el) => {
    if (el.id === menuId) {
      el.name = newName;
    }
    return el;
  });
};

const removeMenuInStore = (Store, currentCategory, menuId) => {
  const selectResult = confirm("정말 삭제하시겠습니까?");
  if (selectResult) {
    Store[currentCategory] = Store[currentCategory].filter(
      (el) => el.id !== menuId
    );
  }
};

export {
  toggleMenuStatusInStore,
  editMenuInStore,
  removeMenuInStore,
}