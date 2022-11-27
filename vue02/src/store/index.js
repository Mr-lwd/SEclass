import { createStore } from "vuex";

export default createStore({
  state: {
    return:{
      token: "",
      is_login: false,
      username: "",
    }
  },
  getters: {
    myName(state) {
      return state.username;
    },
    mtToken(state)
    {
      return state.token;
    }
  },
  mutations: {
    setmyToken(state, mytoken, name)
    {
      state.username = name;
      state.token = mytoken;
      state.islogin = true;
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
