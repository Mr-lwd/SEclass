<template>
  <div style="width: 50vmin">  <form class="row g-3">
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
    <div class="col-md-12">
      <button  class="btn btn-primary" @click="login">Sign in</button>
    </div>
  </form></div>

</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data(){
    return{
      username: "",
      password: ""
    }
  },
  methods:{
    login()
    {
      axios.post('/user/login',
        {
            nickname: this.username,
            pwd: this.password
        }).then(
        (res)=>{
          console.log(res);
        }
      )
    }
  }
};
</script>

<style scoped>

</style>