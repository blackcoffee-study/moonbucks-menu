export function getUUID() {
	// UUID v4 generator in JavaScript (RFC4122 compliant)
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 3) | 8;
		return v.toString(16);
	});
	// 출처: https://goni9071.tistory.com/209 [고니의꿈]
}
