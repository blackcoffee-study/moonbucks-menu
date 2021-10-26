import { addLocalStorage } from '../core/middlewares/addLocalStorage';
import { logger } from '../core/middlewares/logger';
import { applyMiddleware, createStore } from '../core/myRedux';
import { getUUID } from '../utils';

const tabType = Object.freeze({
	에스프레소: 'espresso',
	프라푸치노: 'frappuccino',
	블렌디드: 'blended',
	티바나: 'teavana',
	디저트: 'desert',
});
const reversedTabType = Object.entries(tabType).reduce(
	(acc, [k, v]) => ({ ...acc, [v]: k }),
	{}
);
const menuActionType = Object.freeze({
	ADD: 'ADD',
	NAME_EDIT: 'NAME_EDIT',
	REMOVE: 'REMOVE',

	SOLD_OUT: 'SOLD_OUT',
	CAHNGE_TAB: 'CAHNGE_TAB',
});

const defaultState = {
	currentTab: tabType.에스프레소,
	menus: {
		...Object.keys(tabType).reduce((acc, key) => ({ ...acc, [key]: [] }), {}),
	},
};

const getInitState = () => {
	return JSON.parse(localStorage.getItem('storeState')) || defaultState;
};

// actions
const toggleSoldOut = (menu) => {
	return {
		type: menuActionType.SOLD_OUT,
		payload: { targetId: menu.id, menu },
	};
};

const changeTab = (tab) => {
	return {
		type: menuActionType.CAHNGE_TAB,
		payload: { tab },
	};
};

const addMenu = (menu) => {
	return {
		type: menuActionType.ADD,
		payload: { menu },
	};
};

const editMenu = (menu) => {
	return {
		type: menuActionType.NAME_EDIT,
		payload: { targetId: menu.id, menu },
	};
};

const removeMenu = (id) => {
	return {
		type: menuActionType.REMOVE,
		payload: { id },
	};
};

const setInitState = () => {
	return {
		type: 'SET_INIT_STATE',
		payload: { initState: getInitState() },
	};
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_INIT_STATE': {
			return {
				...action.payload.initState,
			};
		}
		case 'ADD_COUNT': {
			return {
				...state,
				count: state.count + 1,
			};
		}
		case menuActionType.CAHNGE_TAB: {
			return {
				...state,
				currentTab: action.payload.tab,
			};
		}
		case menuActionType.ADD: {
			return {
				...state,
				menus: {
					...state.menus,
					[reversedTabType[state.currentTab]]: state.menus[
						reversedTabType[state.currentTab]
					].concat([action.payload.menu]),
				},
			};
		}
		case menuActionType.SOLD_OUT:
		case menuActionType.NAME_EDIT: {
			const {
				payload: { targetId, menu },
			} = action;
			const newMenu = state.menus[reversedTabType[state.currentTab]].map((es) =>
				es.id === targetId ? menu : es
			);
			return {
				...state,
				menus: { ...state.menus, [reversedTabType[state.currentTab]]: newMenu },
			};
		}
		case menuActionType.REMOVE: {
			const {
				payload: { id },
			} = action;
			const newMenu = state.menus[reversedTabType[state.currentTab]].filter(
				(es) => es.id !== id
			);
			return {
				...state,
				menus: { ...state.menus, [reversedTabType[state.currentTab]]: newMenu },
			};
		}
		default:
			return state;
	}
};

const store = applyMiddleware(createStore(reducer, getInitState()), [
	logger,
	addLocalStorage,
]);

// select states
const getMenus = () => store.getState().menus;

const getCurrentTab = () => {
	return reversedTabType[store.getState().currentTab];
};

const getCurrentMenuList = () => getMenus()[getCurrentTab()];
const getCurrentMenuCount = () => getMenus()[getCurrentTab()].length;
const findCurrentMenuById = (id) =>
	getCurrentMenuList().find((menu) => menu.id === id);

// select actions
const setInitStateAct = () => store.dispatch(setInitState());
const deleteMenuAct = (id) => store.dispatch(removeMenu(id));
const changeTabAct = (selectedTab) => store.dispatch(changeTab(selectedTab));
const toggleSoldOutByCurrentMenuIdAct = (id) => {
	const menu = findCurrentMenuById(id);
	store.dispatch(toggleSoldOut({ ...menu, isSoldOut: !menu.isSoldOut }));
};
const addMenuAct = (inputedName) => {
	store.dispatch(
		addMenu({ id: getUUID(), name: inputedName, isSoldOut: false })
	);
};
const editMenuAct = (id, newName) => {
	const menu = findCurrentMenuById(id);

	store.dispatch(editMenu({ ...menu, name: newName }));
};

export const stateFunctions = {
	getCurrentMenuList,
	getCurrentMenuCount,
	getCurrentTab,
	findCurrentMenuById,
};
export const actions = {
	setInitStateAct,
	deleteMenuAct,
	changeTabAct,
	toggleSoldOutByCurrentMenuIdAct,
	addMenuAct,
	editMenuAct,
};
export default store;
