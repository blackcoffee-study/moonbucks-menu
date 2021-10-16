import { createStore } from '../core/myRedux';

const espressoActionType = Object.freeze({
	ADD: 'ADD',
	EDIT: 'EDIT',
	REMOVE: 'REMOVE',
});

export const addEspresso = (espresso) => {
	return {
		type: espressoActionType.ADD,
		payload: { espresso },
	};
};

export const editEspresso = (espresso) => {
	return {
		type: espressoActionType.EDIT,
		payload: { targetId: espresso.id, espresso },
	};
};

export const removeEspresso = (id) => {
	return {
		type: espressoActionType.REMOVE,
		payload: { id },
	};
};
const espressoReducer = (state, action) => {
	switch (action.type) {
		case espressoActionType.ADD: {
			return {
				...state,
				espresso: state.espresso.concat([action.payload.espresso]),
			};
		}
		case espressoActionType.EDIT: {
			const {
				payload: { targetId, espresso },
			} = action;
			const newEspresso = state.espresso.map((es) =>
				es.id === targetId ? espresso : es
			);
			return {
				...state,
				espresso: newEspresso,
			};
		}
		// case 문에서 EDIT에서와 REMOVE에서 중괄호를 감싸지 않으면
		// Identifier 'newEspresso' has already been declared. (44:9) 이런 에러가 나오던데
		// switch문에서  case간은 원래 동일한 스코프인건가요? 저는 서로 독립적인 스코프라 생각하고 있었는데...
		// 각각의 케이스마다 괄호스코프를 부여해서 해당 에러는 없애긴 했는데 제가 지금까지 잘못 이해하고 있었나요,..ㅎㅎ?
		case espressoActionType.REMOVE: {
			const {
				payload: { id },
			} = action;
			const newEspresso = state.espresso.filter((es) => es.id !== id);
			return { ...state, espresso: newEspresso };
		}
		default:
			return state;
	}
};

export default createStore(espressoReducer, { espresso: [] });
