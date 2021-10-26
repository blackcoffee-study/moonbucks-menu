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
    menuList: (await GetMenu("espresso")) || [
      {
        id: 1,
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
      return state.menuList.push({
        id,
        name,
        isSoldOut,
      });
    },
    DeleteMenu(state, menuId) {
      state.menuList.filter((menu) => menu.id !== menuId);
    },
    EditMenu(state, { menuId, name }) {
      const menu = state.menuList.find((menu) => menu.id === menuId);
      if (!menu) {
        alert("failed to update");
        return false;
      }
      menu.name = name;
    },
    ToggleMenuSoldOut(state, { menuId, isSoldOut }) {
      const menu = state.menuList.find((menu) => menu.id === menuId);
      if (!menu) {
        alert("failed to toggle");
        return false;
      }
      menu.isSoldOut = isSoldOut;
    },
  },
  actions: {
    //actions are not function
    //actions는 결국 Mutations의 메서드를 호출(commit)하는 구조

    FetchCategory: async function ({ commit, state }, { category }) {
      const payload = (await GetMenu(category)) || [];
      commit(action.FETCH, { category, payload });
    },
    AddMenu: async function ({ commit, state, dispatch }, { category, name }) {
      const newMenu = await AddMenu({ category, name });
      commit(action.ADD, {
        id: newMenu.id,
        name: newMenu.name,
        isSoldOut: newMenu.isSoldOut,
      });
    },
    DeleteMenu: async function (
      { commit, state, dispatch },
      { category, menuId }
    ) {
      await DeleteMenu({ category, menuId }).then(() =>
        dispatch(action.FETCH, category)
      );
    },
    EditMenu: async function (
      { commit, state, dispatch },
      { category, menuId, name }
    ) {
      const EditedMenu = await EditMenu({ category, menuId, name });

      commit(action.EDIT, { menuId, name });
    },
    ToggleMenuSoldOut: async function (
      { commit, state, dispatch },
      { category, menuId }
    ) {
      const menu = await ToggleSoldOutMenu({ category, menuId });

      commit(action.TOGGLE, {
        menuId: menu.menuId,
        isSoldOut: menu.isSoldOut,
      });
    },
  },
});
