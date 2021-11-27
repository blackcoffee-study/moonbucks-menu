import Component from '../core/Component.js';
import Menu from './Menu.js';

export default class Main extends Component {
  setup() {
    this.$state = {
      espresso: [],
    };
  }

  template() {
    const { espresso } = this.$state;
    return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-between">
        <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${espresso.length}개</span>
      </div>
      <form id="espresso-menu-form">
        <div class="d-flex w-100">
          <label for="espresso-menu-name" class="input-label" hidden>
            에스프레소 메뉴 이름
          </label>
          <input
            type="text"
            id="espresso-menu-name"
            name="espressoMenuName"
            class="input-field"
            placeholder="에스프레소 메뉴 이름"
            autocomplete="off"
          />
          <button
            type="submit"
            name="submit"
            id="espresso-menu-submit-button"
            class="input-submit bg-green-600 ml-2"
          >
            확인
          </button>
        </div>
      </form>
      <ul id="espresso-menu-list" class="mt-3 pl-0" data-component="menu-list">
        ${espresso
          .map(item => {
            return `
            <li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name${item.id}">${item.name}</span>
                <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button${item.id}"
                    data-id=${item.id}
                >
                    수정
                </button>
                <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm menu-remove-button${item.id}"
                    data-id=${item.id}
                >
                    삭제
                </button>
            </li>
            `;
          })
          .join('')}
      </ul>
  </div>
  `;
  }

  // setEvent() {
  //   this.$target
  //     .querySelector('#espresso-menu-form')
  //     .addEventListener('submit', e => {
  //       e.preventDefault();
  //       const { espresso } = this.$state;
  //       const input = this.$target.querySelector('#espresso-menu-name');
  //       if (input.value === '') {
  //         alert('값을 입력해주세요');
  //         return;
  //       }
  //       this.setState({
  //         espresso: [
  //           ...espresso,
  //           {
  //             id: +`${
  //               espresso.length === 0
  //                 ? espresso.length + 1
  //                 : espresso[espresso.length - 1].id + 1
  //             }`,
  //             name: input.value,
  //           },
  //         ],
  //       });
  //     });

  //   this.$state.espresso.map(item => {
  //     const editButton = this.$target.querySelector(
  //       `.menu-edit-button${item.id}`
  //     );
  //     const removeButton = this.$target.querySelector(
  //       `.menu-remove-button${item.id}`
  //     );
  //     const menuName = this.$target.querySelector(
  //       `.menu-name${item.id}`
  //     ).innerText;

  //     editButton.addEventListener('click', e => {
  //       const value = prompt('메뉴명을 수정하세요', menuName);
  //       const editItems = this.$state.espresso.map(item => {
  //         if (value !== null && item.id === +e.target.dataset.id) {
  //           return { id: item.id, name: value };
  //         }
  //         return item;
  //       });
  //       this.setState({
  //         espresso: editItems,
  //       });
  //     });

  //     removeButton.addEventListener('click', e => {
  //       const confirm = window.confirm('정말 삭제하시겠습니까?');
  //       if (confirm) {
  //         const filterItems = this.$state.espresso.filter(
  //           item => item.id !== +e.target.dataset.id
  //         );
  //         this.setState({
  //           espresso: filterItems,
  //         });
  //       }
  //     });
  //   });
  // }
}
