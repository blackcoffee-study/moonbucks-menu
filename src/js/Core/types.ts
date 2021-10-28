import { APIResult } from "./APIresult";

export type menuItem = {
  id: string;
  name: string;
  isSoldOut: boolean;
};

export type State = {
  selected: Category;
  menuList: menuItem[];
};
export type StoreProp<T extends Object> = {
  state: T;
  mutations: Record<Action, Commit<T>>;
  actions: Record<Action, Dispatch<T>>;
};
export type StoreContext<T extends Object> = {
  state: T;
  commit: (action: Action, payload: any) => void;
  dispatch: (action: Action, payload: any) => any;
};
type Commit<T> = (state: T, payload: any) => void;
type Dispatch<T> = (context: StoreContext<T>, payload: any) => any;

export enum Action {
  INIT = "Init",
  FETCH = "FetchCategory",
  ADD = "AddMenu",
  DELETE = "DeleteMenu",
  EDIT = "EditMenu",
  TOGGLE = "ToggleMenuSoldOut",
}

export enum Category {
  ESPRESSO = "espresso",
  FRAPPUCINO = "frappuccino",
  BLENDED = "blended",
  TEAVANA = "teavana",
  DESERT = "desert",
}
