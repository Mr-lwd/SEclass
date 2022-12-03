import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
    is_login: false,
    username: "",
    role:0,
  },
  getters: {
    myName(state) {
      return state.username;
    },
    myToken(state) {
      return state.token;
    },
    myRole(state) {
      return state.role;
    },
  },
  mutations: {
    setmyToken(state, mytoken) {
      state.token = mytoken;
      state.islogin = true;
    },
    setmyName(state, myName) {
      state.username = myName;
    },
    setmyRole(state, myRole) {
      state.role = myRole;
    },
    logout(state) {
      state.token = "";
      state.username = "";
      state.role = 0;
      state.islogin = false;
    },
  },
  actions: {},
  modules: {},
});
