/**
 * @description Moonbucks-Menu에서 관리하는 메뉴 타입에 대해 정의되어 있는 object
 * @readonly
 */
const MenuType = Object.freeze({
	ESPRESSO: "espresso",
	FRAPPUCCINO: "frappuccino",
	BLENDED: "blended",
	TEAVANA: "teavana",
	DESERT: "desert",
});

/**
 * @description 각 메뉴 MenuType에 해당하는 한글 이름을 저장하는 Object.
 * @readonly
 */
const _MenuTypeKorNameObj = Object.freeze({
	[MenuType.ESPRESSO]: "☕ 에스프레소",
	[MenuType.FRAPPUCCINO]: "🥤 프라푸치노",
	[MenuType.BLENDED]: "🍹 블렌디드",
	[MenuType.TEAVANA]: "🫖 티바나",
	[MenuType.DESERT]: "🍰 디저트",
});

const MenuTypeUtil = Object.freeze({
    getAllType: () => Array.from(Object.values(MenuType)),
    getMenuTypeKorName: (type) => _MenuTypeKorNameObj[type],
    isMenuType: (type) => MenuTypeUtil.getAllType().includes(type)
});


export {MenuType, MenuTypeUtil};