// 상위 컴포넌트 존재
// 하위 컴포넌트 생성
import { $, addEvent } from '../utils';

export default class Component {
	constructor(key, store, $parent = $('body'), props) {
		this.key = key;
		this.$component = $(`[data-component=${key}]`, this.$parent);
		this.store = store;
		this.$parent = $parent;
		this.props = props;
		this.bindedEvents = [];
		store.subscribe(this.key, this.render.bind(this));
		this.render();
		this.setEvents();
	}
	template() {}

	// 추후 컴포넌트 고도화에 사용할 예정
	regex(string) {
		const regex = new RegExp('{{' + string + '}}');
		console.log({ regex });
	}
	render() {
		try {
			this.$component.innerHTML = this.template();
			this.mount();
		} catch (e) {
			console.error(e);
		}
	}
	mount() {}

	/**
	 * @returns {eventType, callback}[]
	 * @type eventType : 이벤트 바인딩할 때 필요한 타입(ex. click, scroll, keypress 등)
	 * @type callback : 이벤트가 발생할 때 실행할 콜백함수
	 * @description this.$parent에 바인딩되는 이벤트리스너 모임
	 */
	bindEvents() {}

	setEvents() {
		this.bindEvents()?.forEach(({ eventType, callback }) => {
			addEvent(this.$component, eventType, callback);
		});
	}
}
