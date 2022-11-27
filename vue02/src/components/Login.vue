<template>
  11
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
      axios.post('/user/login',
        {
          nickname: this.username,
          pwd: this.password
        }).then(
          (res) => {
            console.log(res);
          }
        )
    }
  }
};
</script>

<style scoped>

</style>