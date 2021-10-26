import Component from '../../core/Component';

const categories = [
	{ name: 'espresso', label: '☕ 에스프레소' },
	{ name: 'frappuccino', label: '🥤 프라푸치노' },
	{ name: 'blended', label: '🍹 블렌디드' },
	{ name: 'teavana', label: '🫖 티바나' },
	{ name: 'desert', label: '🍰 디저트' },
];

export default class Category extends Component {
	template() {
		return categories
			.map(
				(cate) => `
	<button
		data-category-name="${cate.name}"
		class="cafe-category-name btn bg-white shadow mx-1"
	>
		${cate.label}
	</button>`
			)
			.join('');
	}
}
