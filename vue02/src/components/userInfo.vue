<template>
  <van-cell-group inset>
    <van-cell title="用户名" :value="UserName" label="用户名" />
    <van-cell title="密码" :value="password" label="密码" />
    <van-cell title="实名" :value="TrueName" label="实名"/>
    <van-cell title="电话号" :value="TelNum" label="电话号" />
    <van-cell title="邮箱" :value="MailNum" label="邮箱"/>
    <van-cell title="身份证号" :value="IDNum" label="身份证号" />
    <van-cell title="性别" :value="sex" label="性别"/>
    <van-cell title="角色" :value="model" label="角色" />
  </van-cell-group>

</template>

<script>
import axios from "axios";

export default {
  name: "userInfo",
  data(){
    return{
      password: "",
      IDNum: "",
      MailNum: "",
      TelNum: "",
      TrueName: "",
      UserName: "",
      sex: null,
      model: null,
    }
  },
  methods:{
  },
  mounted(){
    console.log(this.$cookies.get("token"))
    if(this.$store.getters.myToken == '' && this.$cookies.get("token") != null)
    {
      let tokenx = this.$cookies.get("token");
      this.$store.commit("setmyToken", tokenx);
      let data = new FormData();
      let ttoken = this.$store.getters.myToken;
      console.log("aaa")
      console.log(tokenx)
      console.log(ttoken)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          "Authorization": tokenx,
        },
      };
      axios.post("/user/info",data,config).then(res=>{
        console.log(res.data.data.user);
        let tmp = res.data.data.user;
        this.UserName = tmp.nickName;
        this.$store.commit("setmyName", this.UserName);
        this.TrueName = tmp.name;
        this.password = tmp.pwd;
        this.sex = tmp.sex == 1?"男":"女";
        this.TelNum = tmp.phone;
        this.MailNum = tmp.mail;
        this.model = tmp.role == 1?"用户":"商家";
        this.IDNum = tmp.idCard;
      }).catch(err=>{
        console.log(err);
      })
    }
    if(this.$store.getters.myToken != '')
    {
      let data = new FormData();
      let ttoken = this.$store.getters.myToken;
      console.log("test");
      console.log(this.$store.getters.myToken);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          "Authorization": ttoken,
        },
      };
      axios.post("/user/info",data,config).then(res=>{
        console.log(res);
        let tmp = res.data.data.user;
        this.UserName = tmp.nickName;
        this.TrueName = tmp.name;
        this.password = tmp.pwd;
        this.sex = tmp.sex == 1?"男":"女";
        this.TelNum = tmp.phone;
        this.MailNum = tmp.mail;
        this.model = tmp.role == 2?"用户":"商家";
        this.IDNum = tmp.idCard;
      }).catch(err=>{
        console.log(err);
      })
    }
  }
};
</script>

<style scoped></style>
