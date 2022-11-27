import { createStore } from "vuex";

export default createStore({
  state: {
    return:{
      token: "",
      is_login: false,
    }
  },
  getters: {},
  mutations: {
    setToken(state, mytoken)
    {
      state.token = mytoken;
      state.islogin = true;
    },
    logout(state)
    {
      state.token = "";
      state.islogin = false;
    }
  },
  actions: {

  },
  modules: {},
});
