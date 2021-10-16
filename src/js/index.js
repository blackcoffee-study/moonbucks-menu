(function () {
  // 부모 컴포넌트
  function MenuApp() {
    this.menuItems = []; // {id: number; menuItem: MenuItem}[];
    this.menuList = new MenuList({
      onUpdate: (targetId) => {
        const updatedItems = this.menuItems.filter(({ id }) => targetId !== id);
        this.setState(updatedItems);
      },
      onDelete: (targetId, editName) => {
        const updatedItems = this.menuItems.map((item) => {
          const { id } = item;
          if (id === targetId && editName) {
            item.menuItem = new MenuItem({ name: editName, id });
          }

          return item;
        });

        this.setState(updatedItems);
      },
    });
    this.menuItemId = 1;

    this.setState = (updatedItems) => {
      this.menuItems = updatedItems;
      this.menuList.setState(this.menuItems);
    };

    new MenuInput({
      onAdd: ({ name }) => {
        const id = this.menuItemId;
        const newMenuItem = new MenuItem({ name, id });
        this.menuItems.push({
          id,
          menuItem: newMenuItem,
        });
        this.setState(this.menuItems);
        // TODO id 증가 함수 분리?
        this.menuItemId++;
      },
    });
  }

  // 메뉴 아이템 컴포넌트
  function MenuItem({ name, id }) {
    const li = document.createElement("li");
    li.dataset.id = id;
    li.className = "menu-list-item d-flex items-center py-2";
    li.innerHTML = `
      <span class="w-100 pl-2 menu-name">${name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
      `;

    return li;
  }

  // 입력 받는 컴포넌트
  function MenuInput({ onAdd }) {
    const $menuInput = document.querySelector("#espresso-menu-name");
    const $submitButton = document.querySelector(
      "#espresso-menu-submit-button"
    );
    $submitButton.addEventListener("click", () => this.addMenuItem());
    $menuInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        this.addMenuItem();
      }
    });

    this.addMenuItem = () => {
      const newMenuName = $menuInput.value;
      if (this.isValid(newMenuName)) {
        onAdd({ name: newMenuName });
        $menuInput.value = "";
      } else {
        alert("값을 입력해주세요.");
      }
    };

    this.isValid = (value) => {
      if (value.trim()) {
        return true;
      }

      return false;
    };
  }

  // menuList 보여주는 컴포넌트
  function MenuList({ onUpdate, onDelete }) {
    this.setState = (updatedMenuItems) => {
      this.menuItems = updatedMenuItems;
      this.render(this.menuItems);
    };

    this.handleCount = (items) => {
      const $menuCount = document.querySelector(".menu-count");
      $menuCount.innerHTML = `총 ${items.length}개`;
    };

    this.render = (items) => {
      const $menuList = document.querySelector("#espresso-menu-list");
      $menuList.innerHTML = "";
      items.map(({ menuItem }) => {
        $menuList.appendChild(menuItem);
      });

      this.handleCount(items);

      // 버튼 클릭했을 경우 - menuItems이 변경될때마다 다시 호출되는데 다른방법?
      $menuList.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        const target = e.target;
        const tagName = e.target.tagName;
        if (tagName !== "BUTTON") {
          return;
        }
        const targetId = Number(target.parentElement.dataset.id);

        // 삭제버튼일 경우
        if (target.classList.contains("menu-remove-button")) {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            onUpdate(targetId);
          }
        }

        // 수정 버튼일 경우
        if (target.classList.contains("menu-edit-button")) {
          const targetMenuName =
            target.parentElement.querySelector(".menu-name").innerText;
          const editName = window.prompt("메뉴명을 수정하세요", targetMenuName);
          onDelete(targetId, editName);
        }
      });
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    new MenuApp();
  });
})();
