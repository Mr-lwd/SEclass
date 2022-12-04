<template>
  <div style="width: 50vmin;margin:0 auto;margin-bottom: 10vmin;">
    <van-cell-group inset style>
    <van-cell title="用户名" :value="UserName"  />
    <van-cell title="密码" :value="password"/>
    <van-cell title="实名" :value="TrueName"/>
    <van-cell title="电话号" :value="TelNum"/>
    <van-cell title="邮箱" :value="MailNum"/>
    <van-cell title="身份证号" :value="IDNum" />
    <van-cell title="性别" :value="sex" />
    <van-cell title="角色" :value="model"/>
  </van-cell-group>
    <div style="display:flex;justify-content: center">
      <el-button @click="" style="margin-top: 30px">修改信息</el-button>
    </div>
  </div>
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
        console.log(tmp.role + "role")
        this.UserName = tmp.nickName;
        this.$store.commit("setmyName", this.UserName);
        this.TrueName = tmp.name;
        this.password = tmp.pwd;
        this.sex = tmp.sex == 1?"男":"女";
        this.TelNum = tmp.phone;
        this.MailNum = tmp.mail;
        if(tmp.role == 1)
        {
          console.log("yes!!")
        }
        this.model = tmp.role == 1? "用户":"商家";
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
        this.model = tmp.role == 1?"用户":"商家";
        this.IDNum = tmp.idCard;
      }).catch(err=>{
        console.log(err);
      })
    }
  }
};
</script>

<style scoped></style>
