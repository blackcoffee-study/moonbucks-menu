export function getUUID() {
	// UUID v4 generator in JavaScript (RFC4122 compliant)
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 3) | 8;
		return v.toString(16);
	});
	// 출처: https://goni9071.tistory.com/209 [고니의꿈]
}

export function deepFreeze(object) {
	// 객체에 정의된 속성명을 추출
	var propNames = Object.getOwnPropertyNames(object);

	// 스스로를 동결하기 전에 속성을 동결

	for (let name of propNames) {
		let value = object[name];

		object[name] =
			value && typeof value === 'object' ? deepFreeze(value) : value;
	}

	return Object.freeze(object);
	// 출처:https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
}

export const $ = (selector, target = document) =>
	target.querySelector(selector);

export const addEvent = (el, eventType, listenser) => {
	el.addEventListener(eventType, listenser);
};
