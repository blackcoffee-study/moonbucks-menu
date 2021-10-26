import { Store } from "./Core/Store";
import {
  AddMenu,
  DeleteMenu,
  EditMenu,
  GetMenu,
  ToggleSoldOutMenu,
} from "./Core/API";
import { action, category } from "./Core/Constants";

export const store = new Store({
  state: {
    selected: category.ESPRESSO,
    menuList: [
      {
        id: "",
        name: "",
        isSoldOut: false,
      },
    ],
  },

  mutations: {
    FetchCategory(state, { category, payload }) {
      state.selected = category;
      state.menuList = payload;
    },
    AddMenu(state, { id, name, isSoldOut }) {
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
    DeleteMenu(state, menuId) {
      state.menuList.filter((menu) => menu.id !== menuId);
    },
    EditMenu(state, { id, name }) {
      const menu = state.menuList.find((menu) => menu.id === id);
      if (!menu) {
        return false;
      }
      menu.name = name;
    },
    ToggleMenuSoldOut(state, { id, isSoldOut }) {
      const menu = state.menuList.find((menu) => menu.id === id);
      if (!menu) {
        return false;
      }
      menu.isSoldOut = isSoldOut;
    },
  },
  actions: {
    //actions are not function
    //actions는 결국 Mutations의 메서드를 호출(commit)하는 구조
    Init: async function ({ commit, state }, { __, _ }) {
      const result = await GetMenu(category.ESPRESSO);
      if (result?.ok) {
        commit(action.FETCH, {
          category: category.ESPRESSO,
          payload: result.data,
        });
      } else alert(result?.message);
    },
    FetchCategory: async function ({ commit, state }, { category }) {
      const result = await GetMenu(category);
      if (result?.ok) {
        commit(action.FETCH, { category, payload: result.data });
      } else alert(result?.message);
    },
    AddMenu: async function ({ commit, state, dispatch }, { category, name }) {
      const result = await AddMenu({ category, name });
      if (result?.ok) {
        commit(action.ADD, result.data);
      } else alert(result?.message);
    },
    DeleteMenu: async function ({ commit, state, dispatch }, { category, id }) {
      const result = await DeleteMenu({ category, id });
      if (result?.ok) {
        dispatch(action.FETCH, category);
      } else alert(result?.message);
    },
    EditMenu: async function (
      { commit, state, dispatch },
      { category, id, name }
    ) {
      const result = await EditMenu({ category, id, name });
      if (result?.ok) {
        commit(action.EDIT, result.data);
      } else alert(result?.message);
    },
    ToggleMenuSoldOut: async function (
      { commit, state, dispatch },
      { category, id }
    ) {
      const result = await ToggleSoldOutMenu({ category, id });
      if (result?.ok) {
        commit(action.TOGGLE, result.data);
      } else alert(result?.message);
    },
  },
});
