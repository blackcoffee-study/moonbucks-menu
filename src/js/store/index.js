import { applyMiddleware, createStore } from '../core/myRedux';

const tabType = Object.freeze({
	에스프레소: '에스프레소',
	프라푸치노: '프라푸치노',
	블렌디드: '블렌디드',
	티바나: '티바나',
	디저트: '디저트',
});

const initState = {
	currentTab: tabType.에스프레소,
	menus: {
		...Object.keys(tabType).reduce((acc, key) => ({ ...acc, [key]: [] }), {}),
	},
};

const menuActionType = Object.freeze({
	ADD: 'ADD',
	NAME_EDIT: 'NAME_EDIT',
	REMOVE: 'REMOVE',

	SOLD_OUT: 'SOLD_OUT',
	CAHNGE_TAB: 'CAHNGE_TAB',
});

export const toggleSoldOut = (menu) => {
	return {
		type: menuActionType.SOLD_OUT,
		payload: { targetId: menu.id, menu },
	};
};

export const changeTab = (tab) => {
	return {
		type: menuActionType.CAHNGE_TAB,
		payload: { tab },
	};
};

export const addMenu = (menu) => {
	return {
		type: menuActionType.ADD,
		payload: { menu },
	};
};

export const editMenu = (menu) => {
	return {
		type: menuActionType.NAME_EDIT,
		payload: { targetId: menu.id, menu },
	};
};

export const removeMenu = (id) => {
	return {
		type: menuActionType.REMOVE,
		payload: { id },
	};
};
const menuReducer = (state, action) => {
	switch (action.type) {
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
					[state.currentTab]: state.menus[state.currentTab].concat([
						action.payload.menu,
					]),
				},
			};
		}
		case menuActionType.SOLD_OUT:
		case menuActionType.NAME_EDIT: {
			const {
				payload: { targetId, menu },
			} = action;
			const newMenu = state.menus[state.currentTab].map((es) =>
				es.id === targetId ? menu : es
			);
			return {
				...state,
				menus: { ...state.menus, [state.currentTab]: newMenu },
			};
		}
		// case 문에서 EDIT에서와 REMOVE에서 중괄호를 감싸지 않으면
		// Identifier 'newmenu' has already been declared. (44:9) 이런 에러가 나오던데
		// switch문에서  case간은 원래 동일한 스코프인건가요? 저는 서로 독립적인 스코프라 생각하고 있었는데...
		// 각각의 케이스마다 괄호스코프를 부여해서 해당 에러는 없애긴 했는데 제가 지금까지 잘못 이해하고 있었나요,..ㅎㅎ?
		case menuActionType.REMOVE: {
			const {
				payload: { id },
			} = action;
			const newMenu = state.menus[state.currentTab].filter(
				(es) => es.id !== id
			);
			return {
				...state,
				menus: { ...state.menus, [state.currentTab]: newMenu },
			};
		}
		default:
			return state;
	}
};

const store = createStore(menuReducer, initState);

const logger = (store) => (next) => (action) => {
	console.log('dipatching: ', action);
	next(action);
	console.log('next State: ', store.getState());
};

export default applyMiddleware(store, [logger]);
