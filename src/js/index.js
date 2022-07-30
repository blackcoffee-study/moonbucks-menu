const menuListWrapper = document.querySelector("#espresso-menu-list");
const menuInput = document.querySelector("#espresso-menu-name");
const confirmBtn = document.querySelector("#espresso-menu-submit-button");
const countElem = document.querySelector(".menu-count");
const navElem = document.querySelector("nav");
const menuTableTitleElem = document.querySelector("main .heading h2");

const data = {
  currentCategory: {
    nameKR: "☕ 에스프레소",
    nameEN: "espresso",
  },
  menu: {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  },
};

const initHook = () => {
  if (localStorage.getItem("menu")) {
    data.menu = JSON.parse(localStorage.getItem("menu"));
  }
  rendorMenuTableTitle();
  rendorMenuList();
  menuInput.focus();
};

const createBtnElem = (btnText, btnType) => {
  const btn = document.createElement("button");

  btn.textContent = btnText;
  btn.classList = `bg-gray-50 text-gray-500 text-sm mr-1 menu-${btnType}-button`;
  return btn;
};

const createMenuItemElem = (menuName, isMenuSoldOut) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const soldOutBtn = createBtnElem("품절", "sold-out");
  const editBtn = createBtnElem("수정", "edit");
  const removeBtn = createBtnElem("삭제", "remove");

  span.textContent = menuName;
  span.className = "w-100 pl-2 menu-name";
  if (isMenuSoldOut) {
    span.classList.add("sold-out");
  }

  soldOutBtn.addEventListener("click", () => {
    const soldOutMenuIdx = li.getAttribute("data-menu-id");

    data.menu[data.currentCategory.nameEN].splice(soldOutMenuIdx, 1, {
      name: data.menu[data.currentCategory.nameEN][soldOutMenuIdx].name,
      soldOut: !data.menu[data.currentCategory.nameEN][soldOutMenuIdx].soldOut,
    });
    localStorage.setItem("menu", JSON.stringify(data.menu));
    rendorMenuList();
  });

  editBtn.addEventListener("click", () => {
    const editMenuIdx = li.getAttribute("data-menu-id");
    const menuName = prompt("메뉴명을 수정하세요 :)");

    data.menu[data.currentCategory.nameEN].splice(editMenuIdx, 1, {
      name: menuName,
      soldOut: data.menu[data.currentCategory.nameEN][editMenuIdx].soldOut,
    });
    localStorage.setItem("menu", JSON.stringify(data.menu));
    rendorMenuList();
  });

  removeBtn.addEventListener("click", () => {
    const removeMenuIdx = li.getAttribute("data-menu-id");

    if (window.confirm("정말 삭제하시겠습니다까?")) {
      data.menu[data.currentCategory.nameEN].splice(removeMenuIdx, 1);
      localStorage.setItem("menu", JSON.stringify(data.menu));
      rendorMenuList();
    }
  });

  li.append(span, soldOutBtn, editBtn, removeBtn);
  li.className = "menu-list-item d-flex items-center py-2";
  return li;
};

const rendorMenuList = () => {
  const newMenuElem = [];

  for (let i = 0; i < data.menu[data.currentCategory.nameEN].length; i++) {
    const menuElem = createMenuItemElem(
      data.menu[data.currentCategory.nameEN][i].name,
      data.menu[data.currentCategory.nameEN][i].soldOut
    );

    menuElem.setAttribute("data-menu-id", i);
    newMenuElem.push(menuElem);
  }
  menuListWrapper.replaceChildren(...newMenuElem);
  countElem.innerHTML = `총 ${data.menu[data.currentCategory.nameEN].length}개`;
};

const rendorMenuTableTitle = () => {
  menuTableTitleElem.innerText = `${data.currentCategory.nameKR} 메뉴 관리`;
};

navElem.addEventListener("click", (event) => {
  if (event.target.classList.contains("cafe-category-name")) {
    menuInput.value = "";
    menuInput.focus();

    data.currentCategory.nameKR = event.target.innerText;
    data.currentCategory.nameEN =
      event.target.getAttribute("data-category-name");
    rendorMenuTableTitle();
    rendorMenuList();
  }
});

confirmBtn.addEventListener("click", () => {
  if (menuInput.value === "") {
    alert("메뉴를 입력해주세요 :)");
    menuInput.focus();
    return;
  }

  data.menu[data.currentCategory.nameEN].push({
    name: menuInput.value,
    soldOut: false,
  });
  localStorage.setItem("menu", JSON.stringify(data.menu));
  rendorMenuList();

  menuInput.value = "";
  menuInput.focus();
});

initHook();
