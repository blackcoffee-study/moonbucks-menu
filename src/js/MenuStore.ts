import { Store } from "./Core/Store";
import {
  AddMenu,
  DeleteMenu,
  EditMenu,
  GetMenu,
  ToggleSoldOutMenu,
} from "./Core/API";
import { Action, Category } from "./Core/types";

import { AddDTO, DeleteDTO, EditDTO, ToggleDTO } from "./Core/DTO";

export const store = new Store({
  state: {
    selected: Category.ESPRESSO,
    menuList: [{ id: "1", name: "hi", isSoldOut: false }],
  },
  mutations: {
    [Action.INIT]: (state, payload) => {
      state.selected = Category.ESPRESSO;
      state.menuList = payload;
    },
    [Action.FETCH]: (state, { category, payload }) => {
      state.selected = category;
      state.menuList = payload;
    },
    [Action.ADD]: (state, payload) => {
      const { id, name, isSoldOut } = payload;
      console.log(payload);
      const checkExists = state.menuList.findIndex(
        (menu) => menu.name === name
      );
      if (checkExists > 0) {
        alert("메뉴가 이미 있습니다");
      }
      state.menuList = state.menuList.concat({
        id,
        name,
        isSoldOut,
      });
    },
    [Action.DELETE]: (state, id) => {
      state.menuList = state.menuList.filter((menu) => menu.id !== id);
    },
    [Action.EDIT]: (state, payload) => {
      const { id, name, isSoldOut } = payload;
      const newList = [...state.menuList];
      const menu = newList.find((menu) => menu.id === id);
      if (!menu) {
        alert("존재하지 않는 메뉴입니다");
        return false;
      }
      menu.name = name;
      state.menuList = newList;
    },
    [Action.TOGGLE]: (state, payload) => {
      const { id } = payload;
      const newList = [...state.menuList];
      const menu = newList.find((menu) => menu.id === id);
      if (!menu) {
        alert("존재하지 않는 메뉴입니다");
        return false;
      }
      console.log(menu);
      menu.isSoldOut = !menu.isSoldOut;
      state.menuList = newList;
    },
  },
  actions: {
    //actions are not function
    //actions는 결국 Mutations의 메서드를 호출(commit)하는 구조
    [Action.INIT]: async function ({ commit, state }, _) {
      const result = await GetMenu(Category.ESPRESSO);
      if (result?.ok) {
        commit(Action.INIT, result.data);
      } else alert(result?.message);
    },
    [Action.FETCH]: async function ({ commit, state }, category) {
      const result = await GetMenu(category);
      console.log(result);
      if (result?.ok) {
        commit(Action.FETCH, { category, payload: result.data });
      } else alert(result?.message);
    },
    [Action.ADD]: async function ({ commit, state, dispatch }, addDTO: AddDTO) {
      const result = await AddMenu(addDTO);
      console.log(result);
      if (result?.ok) {
        commit(Action.ADD, result.data);
      } else alert(result?.message);
    },
    [Action.DELETE]: async function (
      { commit, state, dispatch },
      deleteDTO: DeleteDTO
    ) {
      const result = await DeleteMenu(deleteDTO);
      console.log(result);
      if (result?.ok) {
        commit(Action.DELETE, deleteDTO.id);
      } else alert(result?.message);
    },
    [Action.EDIT]: async function (
      { commit, state, dispatch },
      editDTO: EditDTO
    ) {
      const result = await EditMenu(editDTO);
      console.log(result);
      if (result?.ok) {
        commit(Action.EDIT, result.data);
      } else alert(result?.message);
    },
    [Action.TOGGLE]: async function (
      { commit, state, dispatch },
      toggleDTO: ToggleDTO
    ) {
      const result = await ToggleSoldOutMenu(toggleDTO);
      console.log(result);
      if (result?.ok) {
        commit(Action.TOGGLE, result.data);
      } else alert(result?.message);
    },
  },
});
