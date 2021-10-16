import { createStore } from '../js/core/myRedux';

const counterActionType = Object.freeze({
	INCREASEMENT: 'INCREASEMENT',
	DECREASEMENT: 'DECREASEMENT',
});

const increaseCounter = () => {
	return {
		type: counterActionType.INCREASEMENT,
	};
};
const decreaseCounter = () => {
	return {
		type: counterActionType.DECREASEMENT,
	};
};
describe('store test', () => {
	test('createStore(reducer)를 실행하면, store.getState()가 []를 반환한다.', () => {
		const reducer = (state, action) => {
			switch (action.type) {
				default:
					return state;
			}
		};
		const store = createStore(reducer, []);
		expect(store.getState()).toEqual([]);
	});

	describe('reducer는 counterReduer이다.', () => {
		let store;
		beforeEach(() => {
			const counterReducer = (state, action) => {
				switch (action.type) {
					case counterActionType.INCREASEMENT:
						return { ...state, counter: state.counter + 1 };
					case counterActionType.DECREASEMENT:
						return { ...state, counter: state.counter - 1 };
					default:
						return state;
				}
			};
			store = createStore(counterReducer, { counter: 0 });
		});
		test('store.dispatch(increaseCounter())를 하면, getState()햇을 때 counter:1을 반환한다.', () => {
			store.dispatch(increaseCounter());

			expect(store.getState()).toEqual({ counter: 1 });
		});
		test('store.dispatch(decreaseCounter())하면, store.getState()했을 때 counter:-1을 반환한다.', () => {
			store.dispatch(decreaseCounter());

			expect(store.getState()).toEqual({ counter: -1 });
		});

		describe('subscribe에 등록한 callback함수는 dispatch가 실행될때마다 사이드이펙트로 실행된다.', () => {
			describe('subscribe에 pushHistory callback 함수를 등록한다. 이 함수는 history 배열에 "h"라는 텍스트를 push한다.', () => {
				let history = [];
				let unSubscribe;
				const pushHisory = () => {
					history.push('h');
				};

				beforeEach(() => {
					unSubscribe = store.subscribe(() => {
						pushHisory();
					});
				});
				afterEach(() => {
					history = [];
					unSubscribe();
				});
				test('store.dispatch(increaseCounter())를 실행하면, history베열이 ["h"]가 돤다.', () => {
					store.dispatch(increaseCounter());

					expect(history).toEqual(['h']);
				});
				describe('history2에 매 dispatch가 발생할때마다 해당 state를 저장하는 callback을 구독한다.', () => {
					let history2 = [];
					let unSubscribe2;
					const pushHisory2 = () => {
						history2.push(store.getState());
					};
					beforeEach(() => {
						unSubscribe2 = store.subscribe(() => {
							pushHisory2();
						});
					});
					afterEach(() => {
						unSubscribe2();
						history2 = [];
					});

					test('store.dispatch(increaseCounter())를 실행하면, history베열이 ["h"]가 되면서 history2배열은 [{counter:1}]이 된다.', () => {
						store.dispatch(increaseCounter());

						expect(history).toEqual(['h']);
						expect(history2).toEqual([{ counter: 1 }]);
					});
				});
			});
		});
	});
});
