const menuListWrapper = document.querySelector("#espresso-menu-list");
const menuInput = document.querySelector("#espresso-menu-name");
const confirmBtn = document.querySelector("#espresso-menu-submit-button");
const countElem = document.querySelector(".menu-count");

const data = {
  menuList: [],
};

const createBtnElem = (btnText, btnType) => {
  const btn = document.createElement("button");

  btn.textContent = btnText;
  btn.classList = `bg-gray-50 text-gray-500 text-sm mr-1 menu-${btnType}-button`;
  return btn;
};

const createMenuItemElem = (menuName) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const soldOutBtn = createBtnElem("품절", "sold-out");
  const editBtn = createBtnElem("수정", "edit");
  const removeBtn = createBtnElem("삭제", "remove");

  span.textContent = menuName;
  span.className = "w-100 pl-2 menu-name";

  editBtn.addEventListener("click", () => {
    const editMenuIdx = li.getAttribute("data-menu-id");
    const menuName = prompt("메뉴명을 수정하세요 :)");

    data.menuList.splice(editMenuIdx, 1, createMenuItemElem(menuName));
    rendorMenuList();
  });

  removeBtn.addEventListener("click", () => {
    const removeMenuIdx = li.getAttribute("data-menu-id");

    if (window.confirm("정말 삭제하시겠습니다까?")) {
      data.menuList.splice(removeMenuIdx, 1);
      rendorMenuList();
    }
  });

  li.append(span, soldOutBtn, editBtn, removeBtn);
  li.className = "menu-list-item d-flex items-center py-2";
  return li;
};

const rendorMenuList = () => {
  for (let i = 0; i < data.menuList.length; i++) {
    const menuElem = data.menuList[i];

    menuElem.setAttribute("data-menu-id", i);
  }
  menuListWrapper.replaceChildren(...data.menuList);
  countElem.innerHTML = `총 ${data.menuList.length}개`;
};

confirmBtn.addEventListener("click", () => {
  if (menuInput.value === "") {
    alert("메뉴를 입력해주세요 :)");
    menuInput.focus();
    return;
  }

  data.menuList.push(createMenuItemElem(menuInput.value));
  rendorMenuList();

  menuInput.value = "";
  menuInput.focus();
});
