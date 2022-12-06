<template>
  <div>
    <form class="row g-3" v-on:submit.prevent>
      <div class="col-md-3 RegisterForm">
        <div class="col-md-12">
          <label for="username" class="col-md-6 form-label">用户名</label>
          <input
            type="uuid"
            class="form-control"
            id="username"
            v-model="UserName"
          />
        </div>
        <div class="col-md-12">
          <label for="TrueName" class="col-md-6 form-label">实名</label>
          <input
            type="uuid"
            class="form-control"
            id="TrueName"
            v-model="TrueName"
          />
        </div>
        <div class="col-md-12">
          <label for="Tel" class="col-md-6 form-label">手机号</label>
          <input type="uuid" class="form-control" id="Tel" v-model="TelNum" />
        </div>
        <div class="col-md-12">
          <label for="Email" class="col-md-6 form-label">邮箱</label>
          <input
            type="uuid"
            class="form-control"
            id="Email"
            v-model="MailNum"
          />
        </div>
        <div class="col-md-12">
          <label for="sex" class="col-md-6 form-label">性别</label>
          <select class="form-select" id="sex" v-model="sex">
            <option>男</option>
            <option>女</option>
          </select>
        </div>
        <div class="col-md-12">
          <label for="sex" class="col-md-6 form-label">角色</label>
          <select class="form-select" id="model" v-model="model">
            <option>用户</option>
            <option>商家</option>
          </select>
        </div>
        <div class="col-md-12">
          <label for="IDNum" class="col-md-6 form-label">身份证号</label>
          <input type="uuid" class="form-control" id="IDNum" v-model="IDNum" />
        </div>
        <div class="col-md-12">
          <label for="inputPassword1" class="form-label">密码</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword1"
            v-model="password"
          />
        </div>
        <div class="col-md-12">
          <label for="inputPassword2" class="form-label">确认密码</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword2"
            v-model="checkPassword"
          />
        </div>
        <div
          class="col-md-12"
          style="text-align: center; vertical-align: middle"
        >
          <button class="btn btn-primary col-md-6" @click="register">
            注册
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRegister",
  data() {
    return {
      password: "",
      checkPassword: "",
      IDNum: "",
      MailNum: "",
      TelNum: "",
      TrueName: "",
      UserName: "",
      sex: null,
      model: null,
    };
  },
  methods: {
    register() {
      if (
        this.checkPassword == this.password &&
        this.password != "" &&
        this.checkPassword != "" &&
        this.IDNum != "" &&
        this.MailNum != "" &&
        this.TelNum != "" &&
        this.TrueName != "" &&
        this.UserName != "" &&
        this.sex != null &&
        this.model != null
      ) {
        var data = new FormData();
        data.append("idCard", this.IDNum);
        data.append("mall", this.MailNum);
        data.append("name", this.TrueName);
        data.append("nickName", this.UserName);
        data.append("phone", this.TelNum);
        data.append("pwd", this.password);
        data.append("role", this.model == "用户" ? 1 : 2);
        data.append("sex", this.sex == "男" ? 1 : 2);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        axios
          .post("/user/sign", data, config)
          .then((res) => {
            if (res.data.code == 100) {
              alert("注册成功");
              this.$router.push("/login");
            } else {
              alert(res.data.message);
            }
          })
          .catch((res) => {
            console.log(res);
            alert("请重新注册");
          });
      } else {
        alert("请重新确认");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.RegisterForm {
  margin: 0 auto;
  margin-top: 3vmin;
  width: 60vmin;
  input,
  select,
  button {
    margin-bottom: 3vmin;
  }
}
</style>
