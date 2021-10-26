export type menuItem = {
  id: number;
  name: string;
  isSoldOut: boolean;
};

export type State = {
  selected: string;
  menuList: menuItem[];
};
export type StoreProp<T> = {
  state: T;
  mutations: Record<string, Commit<T>>;
  actions: Record<string, Dispatch<T>>;
};
export type StoreContext<T> = {
  state: T;
  commit: (action: string, payload: any) => void;
  dispatch: (action: string, ...params: any[]) => any;
};
type Commit<T> = (state: T, payload: any) => void;
type Dispatch<T> = (context: StoreContext<T>, ...params: any[]) => any;
