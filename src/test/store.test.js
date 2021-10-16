import store, {
	addEspresso,
	editEspresso,
	removeEspresso,
} from '../js/store/index.js';
describe('store.getState()에 {espresso:[]}가 담겨져 있다.', () => {
	beforeEach(() => {
		store.reset();
	});
	test(`
  store.dispatch(addEspresso({id:1, name:'아메리카노' }))를 하면 
  store.getState()에 [{id:1, name:'아메리카노' }]가 담겨있다.
  `, () => {
		const espresso = { id: 1, name: '아메리카노' };
		store.dispatch(addEspresso(espresso));

		expect(store.getState()).toEqual({ espresso: [{ ...espresso }] });
	});
	test(`
  store.dispatch(editEsopresso({id:1, name:'카푸치노' }))를 하면 
  store.getState()에 [{id:1, name:'카푸치노' }]가 담겨있다.
  `, () => {
		const espresso = { id: 1, name: '아메리카노' };
		store.dispatch(addEspresso(espresso));

		store.dispatch(editEspresso({ id: 1, name: '카푸치노' }));

		expect(store.getState()).toEqual({
			espresso: [{ id: 1, name: '카푸치노' }],
		});
	});
	test(`
  기존 store.getState()에 [{id:1, name:'카푸치노' }]가 있을 때,
  store.dispatch(removeEsopresso(1))를 하면 
  store.getState()에 []가 담겨있다.
  `, () => {
		const espresso = { id: 1, name: '아메리카노' };
		store.dispatch(addEspresso(espresso));

		store.dispatch(removeEspresso(1));

		expect(store.getState()).toEqual({
			espresso: [],
		});
	});
});
