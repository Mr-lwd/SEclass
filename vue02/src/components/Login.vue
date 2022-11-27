<template>
  <div class="loginForm">
    <form class="row g-3" v-on:submit.prevent>
      <div class="col-md-6">
        <label for="inputEmail4" class="col-md-6 form-label">用户名</label>
        <div class="col-md-12">
          <input type="uuid" class="form-control" id="inputEmail4" v-model="username">
        </div>
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Password</label>
        <input type="password" class="form-control" id="inputPassword4" v-model="password">
      </div>
      <div class="col-md-12" style="text-align: center; ">
        <button class="btn btn-primary col-md-6" @click="login">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      var data = new FormData()
      console.log(this.username)
      data.append('nickName', this.username);
      data.append('pwd', this.password);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data '
        }
      }
      axios.post('/user/login', data, config).then(
        (res) => {
         let token = res.data.data.Authorization;
         let name = res.data.data.nickName;
         console.log(name)
          this.$store.commit("setmyToken",token, name);
         console.log(this.$store.getters.myName);
         console.log(this.$store.state.username);
          console.log(this.$store.state.token);
          console.log(this.$store.getters.myToken);
          this.$router.push('/index');
          alert("登录成功");
        }
      ).catch(res=>
      {
        console.log(res);
        alert("登录失败");
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.loginForm {
  margin: 0 auto;
  width: 60vmin;

}
</style>