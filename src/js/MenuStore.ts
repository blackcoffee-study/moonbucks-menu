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
    menuList: [
      {
        id: "123",
        name: "my menu",
        isSoldOut: false,
      },
    ],
  },
  mutations: {
    Init: (state, payload) => {
      state.selected = Category.ESPRESSO;
      state.menuList = payload;
    },
    FetchCategory(state, { category, payload }) {
      state.selected = category;
      state.menuList = payload;
    },
    AddMenu(state, payload) {
      const { id, name, isSoldOut } = payload;
      const checkExists = state.menuList.findIndex(
        (menu) => menu.name === name
      );
      if (checkExists > 0) {
        alert("메뉴가 이미 있습니다");
      }
      return state.menuList.push({
        id,
        name,
        isSoldOut,
      });
    },
    DeleteMenu(state, id) {
      state.menuList.filter((menu) => menu.id !== id);
    },
    EditMenu(state, payload) {
      const { id, name, isSoldOut } = payload;
      const menu = state.menuList.find((menu) => menu.id === id);
      if (!menu) {
        alert("존재하지 않는 메뉴입니다");
        return false;
      }
      menu.name = name;
    },
    ToggleMenuSoldOut(state, payload) {
      const { id } = payload;
      const menu = state.menuList.find((menu) => menu.id === id);
      if (!menu) {
        alert("존재하지 않는 메뉴입니다");
        return false;
      }
      menu.isSoldOut = !menu.isSoldOut;
    },
  },
  actions: {
    //actions are not function
    //actions는 결국 Mutations의 메서드를 호출(commit)하는 구조
    Init: async function ({ commit, state }, _) {
      const result = await GetMenu(Category.ESPRESSO);
      if (result?.ok) {
        commit(Action.INIT, result.data);
      } else alert(result?.message);
    },
    FetchCategory: async function ({ commit, state }, category) {
      const result = await GetMenu(category);
      if (result?.ok) {
        commit(Action.FETCH, { category, payload: result.data });
      } else alert(result?.message);
    },
    AddMenu: async function ({ commit, state, dispatch }, addDTO: AddDTO) {
      const result = await AddMenu(addDTO);
      if (result?.ok) {
        commit(Action.ADD, result.data);
      } else alert(result?.message);
    },
    DeleteMenu: async function (
      { commit, state, dispatch },
      deleteDTO: DeleteDTO
    ) {
      const result = await DeleteMenu(deleteDTO);
      if (result?.ok) {
        commit(Action.DELETE, deleteDTO.id);
      } else alert(result?.message);
    },
    EditMenu: async function ({ commit, state, dispatch }, editDTO: EditDTO) {
      const result = await EditMenu(editDTO);
      if (result?.ok) {
        commit(Action.EDIT, result.data);
      } else alert(result?.message);
    },
    ToggleMenuSoldOut: async function (
      { commit, state, dispatch },
      toggleDTO: ToggleDTO
    ) {
      const result = await ToggleSoldOutMenu(toggleDTO);
      if (result?.ok) {
        commit(Action.TOGGLE, result.data);
      } else alert(result?.message);
    },
  },
});
