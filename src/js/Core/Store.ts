import { deepObservable, observable } from "./observer";
import { GetMenu } from "./API";
import { Action, Category, State, StoreProp } from "./types";

export class Store {
  private $state;
  private $mutations;
  private $actions;
  state;

  constructor({ state, mutations, actions }: StoreProp<State>) {
    this.$state = deepObservable(state);
    this.$mutations = mutations;
    this.$actions = actions;
    this.state = new Proxy(state, {
      get: (target, name) => Reflect.get(this.$state, name),
    });
    // state를 직접적으로 수정하지 못하도록 다음과 같이 정의한다.
  }

  async Init() {
    const result = await GetMenu(Category.ESPRESSO);
    this.$state = deepObservable({
      selected: Category.ESPRESSO,
      menuList: result?.data || [
        {
          id: "1",
          name: "hi",
          isSoldOut: false,
        },
      ],
    });
  }

  commit(action: Action, payload: any) {
    this.$mutations[action](this.$state, payload);
  }

  dispatch(action: Action, payload: any) {
    //dispatch는 비동기 처리 로직
    this.$actions[action](
      {
        state: this.$state,
        commit: this.commit.bind(this),
        dispatch: this.dispatch.bind(this),
      },
      payload
    );
  }
}
