<template>
  <div class="wrapper">
    <div class="frame">
      <div class="title"><b>登录</b></div>
      <form method="POST" v-on:submit.prevent>
        <el-form :model="user" :rules="rules" ref="userForm">
          <el-form-item prop="username">
            <el-input prefix-icon="user-filled" v-model="username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="lock" v-model="password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>

        <div class="buttonGroup">
          <button type="submit" class="btn btn-primary" @click="login" style="margin-right: 20px;">提交</button>
          <button type="submit" class="btn btn-success" @click="$router.push('/index')">返回</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "UserLogin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      var data = new FormData();
      data.append("nickName", this.username);
      data.append("pwd", this.password);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
        },
      };
      axios
        .post("/user/login", data, config)
        .then((res) => {
          let token = res.data.data.Authorization;
          let name = res.data.data.nickName;
          let role = res.data.data.role;
          console.log(name);
          this.$store.commit("setmyToken", token);
          this.$store.commit("setmyName", name);
          this.$store.commit("setmyRole", role);
          this.$cookies.set("role", role, "1D");
          this.$cookies.set("username", name, "1D");
          this.$cookies.set("token", token, "1D");
          console.log(token);
          this.$router.push("/index");
          ElMessage({
            message: '登录成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.$router.push('/index')
            }
          })
        })
        .catch((res) => {
          ElMessage.error("用户名密码错误");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #e8bac7, #003cff);
  overflow: hidden;

  .frame {
    margin: 20vh auto;
    background-color: white;
    width: 350px;
    height: 300px;
    padding: 20px;
    border-radius: 10px;

    .title {
      margin: 20px 0;
      text-align: center;
      font-size: 24px;
    }

    input {
      margin-bottom: 10px;
    }

    .buttonGroup {
      margin: 10px 0;
      text-align: right;
    }
  }
}
</style>
