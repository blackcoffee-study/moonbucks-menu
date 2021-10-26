import Component from '../../core/Component';
import { stateFunctions } from '../../store';

export default class MenuTitle extends Component {
	template() {
		const title = stateFunctions.getCurrentTab();
		const total = stateFunctions.getCurrentMenuCount();
		return `
    <h2 class="mt-1 menu-title">${title} 메뉴 관리</h2>
    <span class="mr-2 mt-4 menu-count">총 ${total}개</span>
    `;
	}
}
