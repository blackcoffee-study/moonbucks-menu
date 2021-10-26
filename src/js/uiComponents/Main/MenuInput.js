import { EVENTS } from '../../constants';
import Component from '../../core/Component';
import { actions, stateFunctions } from '../../store';
import { $ } from '../../utils';

export default class MenuInput extends Component {
	template() {
		const currentTab = stateFunctions.getCurrentTab();
		return `
    <div class="d-flex w-100">
      <label for="espresso-menu-name" class="input-label" hidden>
        ${currentTab} 메뉴 이름
      </label>
      <input
        type="text"
        id="espresso-menu-name"
        name="espressoMenuName"
        class="input-field"
        placeholder="${currentTab} 메뉴 이름"
        autocomplete="off"
        autofocus
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
    `;
	}
	onSubmit(e) {
		const $input = $('#espresso-menu-name');
		e.preventDefault();
		if ($input.value) {
			actions.addMenuAct($input.value);
			$input.value = '';
		}
	}
	bindEvents() {
		return [{ eventType: EVENTS.submit, callback: this.onSubmit.bind(this) }];
	}
}
