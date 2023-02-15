import { createStore } from "vuex";

export const store = createStore({
  state: {
    selectedHeadline: {},
  },
  mutations: {
    setHeadline(state, payload) {
      state.selectedHeadline = payload;
    },
  },
  actions: {
    setHeadline({ commit }, payload) {
      commit("setHeadline", payload);
    },
  },
});
