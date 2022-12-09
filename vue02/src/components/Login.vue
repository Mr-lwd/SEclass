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
          <el-form-item prop="code">
            <el-input prefix-icon="lock" v-model="code"  placeholder="请输入验证码"></el-input>
          </el-form-item>
          <div class="code">
            <canvas id="canvas" @click="MyhandleCanvas"> </canvas>
          </div>
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
      code: "",
      true_code: "",//保存正确的验证码
      yanzhen_arr:[],
    };
  },
  mounted() {
    this.draw(this.yanzhen_arr);
  },
  methods: {
    login() {
      if(this.code.toLowerCase() == this.true_code.toLowerCase()) {
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
            // console.log(name);
            this.$store.commit("setmyToken", token);
            this.$store.commit("setmyName", name);
            this.$store.commit("setmyRole", role);
            this.$cookies.set("role", role, "1D");
            this.$cookies.set("username", name, "1D");
            this.$cookies.set("token", token, "1D");
            // console.log(token);
            this.$router.push("/index");
            // console.log(res)
            ElMessage({
              message: '登录成功',
              type: 'success',
              duration: 1000,
              // onClose: () => {
              //   this.$router.push('/index')
              // }
            })
          })
          .catch((res) => {
            ElMessage.error("用户名密码错误");
          });
      }
      else{
        // alert("验证码错误");
        ElMessage.error("验证码错误");
      }

    },
    draw(show_num) {
      var canvas_width =  document.querySelector("#canvas").clientWidth;
      var canvas_height = document.querySelector("#canvas").clientHeight;
      var canvas = document.getElementById("canvas"); //获取到canvas
      var context = canvas.getContext("2d"); //获取到canvas画图
      canvas.width = canvas_width;
      canvas.height = canvas_height;
      var sCode =
        "a,b,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
      var aCode = sCode.split(",");
      var aLength = aCode.length; //获取到数组的长度

      //4个验证码数
      for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
        var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
        var txt = aCode[j]; //得到随机的一个内容
        show_num[i] = txt.toLowerCase();// 依次把取得的内容放到数组里面
        var x = 10 + i * 20; //文字在canvas上的x坐标
        var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = this.randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
      }
      //验证码上显示6条线条
      for (var i = 0; i <= 5; i++) {
        context.strokeStyle = this.randomColor();
        context.beginPath();
        context.moveTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        );
        context.lineTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        );
        context.stroke();
      }
      //验证码上显示31个小点
      for (let i = 0; i <= 30; i++) {
        context.strokeStyle = this.randomColor();
        context.beginPath();
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }

      //最后把取得的验证码数组存起来，方式不唯一
      let num = show_num.join("");
      // console.log(num);
      this.true_code = num
    },
    //得到随机的颜色值
    randomColor() {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    MyhandleCanvas(){
      this.draw(this.yanzhen_arr);
    }
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
    height: 350px;
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
    .code {
      #canvas {
        width: 120px;
        height: 33px;
        text-align: center;
        margin-right: 1%;
        display: block;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 90px;
      }
    }

    .buttonGroup {
      margin: 20px 0;
      //text-align: right;
      width: 100%;
      text-align: center;
      button{
        width: 90px;
      }
    }


  }
}

</style>
