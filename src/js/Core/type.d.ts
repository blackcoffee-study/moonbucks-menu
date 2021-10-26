export type menuItem = {
  id: string;
  name: string;
  isSoldOut: boolean;
};

export type State = {
  selected: string;
  menuList: menuItem[];
};
export type StoreProp<T extends Object> = {
  state: T;
  mutations: Record<string, Commit<T>>;
  actions: Record<string, Dispatch<T>>;
};
export type StoreContext<T extends Object> = {
  state: T;
  commit: (action: string, payload: any) => void;
  dispatch: (action: string, payload: any) => any;
};
type Commit<T> = (state: T, payload: any) => void;
type Dispatch<T> = (context: StoreContext<T>, payload: any) => any;

export type RequestProps = Partial<menuItem> & { category: string };
