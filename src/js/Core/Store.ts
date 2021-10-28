import { observable } from "./observer";
import { GetMenu } from "./API";
import { Action, Category, State, StoreProp } from "./types";

export class Store {
  private $state;
  private $mutations;
  private $actions;
  state;

  constructor({ state, mutations, actions }: StoreProp<State>) {
    this.$state = observable(state);
    this.$mutations = mutations;
    this.$actions = actions;

    // state를 직접적으로 수정하지 못하도록 다음과 같이 정의한다.
    this.state = new Proxy(state, {
      get: (target, name) => this.$state[name as keyof State],
    });
  }

  commit(action: Action, payload: any) {
    this.$mutations[action](this.$state, payload);
  }

  dispatch(action: Action, payload: any): any {
    //dispatch는 비동기 처리 로직
    return this.$actions[action](
      {
        state: this.$state,
        commit: this.commit.bind(this),
        dispatch: this.dispatch.bind(this),
      },
      payload
    );
  }
}
