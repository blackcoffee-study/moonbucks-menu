import { EVENTS, MESSAGES, SELECTORS } from '../../constants';
import Component from '../../core/Component';
import {actions, stateFunctions, tabType} from '../../store';
import {FETCH_RESULT, putMenuByCategory, soldOutMenuByCategory} from "../../apis";

class MenuItem extends Component {
	template() {
		const { item } = this.props;

		return `
      <span class="w-100 pl-2 menu-name ${item.isSoldOut ? 'sold-out' : ''}">
      ${item.name}
      </span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        data-id="${item.id}"
      >
        ${item.isSoldOut ? '입고' : '품절'}
      </button>
      <button
        type="button"
        class="
          bg-gray-50
          text-gray-500 text-sm
          mr-1
          menu-edit-button
        "
        data-id="${item.id}"
      >
      수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        data-id="${item.id}"
      >
        삭제
      </button>
    `;
	}
}

export default class MenuList extends Component {
	template() {
		const menuList = stateFunctions.getCurrentMenuList();
		return `${menuList
			.map(
				(item) => `
    <li class="menu-list-item d-flex items-center py-2" data-component="item-${item.id}">
    {{${item.name}}}
    </li>
    `
			)
			.join('')}`;
	}

	mount() {
		const menuList = stateFunctions.getCurrentMenuList();

		menuList.forEach(
			(item) =>
				new MenuItem(`item-${item.id}`, this.store, this.$component, { item })
		);
	}

    async onToggleSoldOut(e) {
		const { target } = e;
		if (target.closest('.menu-sold-out-button')) {
			const id = target.dataset.id;
            const currentCategory = tabType[stateFunctions.getCurrentTab()]

            const response = await soldOutMenuByCategory(currentCategory,id)
            if(response.result ===FETCH_RESULT.OK){
			actions.toggleSoldOutByCurrentMenuIdAct(id);

            }else{
                alert(response.message)
            }
		}
	}
	async onEdit(e) {
		const { target } = e;
		if (target.closest(SELECTORS.CLASS.MENU_EDIT_BUTTON)) {
			const id = target.dataset.id;
			const menu = stateFunctions.findCurrentMenuById(id);

			const newName = prompt(MESSAGES.PROMPT_EDIT_MENU, menu.name);

            if (newName) {
                const currentCategory = tabType[stateFunctions.getCurrentTab()]
                const response = await putMenuByCategory(currentCategory,{...menu,name:newName})
                if(response.result ===FETCH_RESULT.OK){

				actions.editMenuAct(id, newName);
                }else{
                    alert(response.message)
                }
			}
		}
	}

	onDelete(e) {
		const { target } = e;
		if (target.closest(SELECTORS.CLASS.MENU_REMOVE_BUTTON)) {
			const answer = confirm(MESSAGES.CONFIRM_REMOVE);
			if (answer) {
				const id = target.dataset.id;
				actions.deleteMenuAct(id);
			}
		}
	}
	bindEvents() {
		return [
			{
				eventType: EVENTS.click,
				callback: this.onEdit.bind(this),
			},
			{
				eventType: EVENTS.click,
				callback: this.onToggleSoldOut.bind(this),
			},
			{
				eventType: EVENTS.click,
				callback: this.onDelete.bind(this),
			},
		];
	}
}
