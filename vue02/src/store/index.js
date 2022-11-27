import { createStore } from "vuex";

export default createStore({
  state: {
      token: "",
      is_login: false,
      username: "",
  },
  getters: {
    myName(state) {
      return state.username;
    },
    myToken(state)
    {
      return state.token;
    }
  },
  mutations: {
    setmyToken(state, mytoken)
    {
      state.token = mytoken;
      state.islogin = true;
    },
    setmyName(state, myName)
    {
      state.token = myName;
    },
    logout(state)
    {
      state.token = "";
      state.username = "";
      state.islogin = false;
    }
  },
  actions: {

  },
  modules: {},
});
