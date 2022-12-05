<template>
  <div style="width: 50vmin;margin:0 auto;margin-bottom: 10vmin;">
    <van-cell-group inset style>
      <van-cell title="用户名" :value="form.UserName" />
      <van-cell title="密码" :value="form.password" />
      <van-cell title="实名" :value="form.TrueName" />
      <van-cell title="电话" :value="form.TelNum" />
      <van-cell title="邮箱" :value="form.MailNum" />
      <van-cell title="身份证" :value="form.IDNum" />
      <van-cell title="性别" :value="form.sex" />
      <van-cell title="角色" :value="form.model" />
    </van-cell-group>
    <el-button @click="(dialogFormVisible = true)">修改信息</el-button>
  </div>
  <el-dialog title="用户信息" v-model="dialogFormVisible" style="max-width: 60vmin;">
    <template #default>
      <el-form label-width="10vmin" style="margin: 3vmin;" label-position="right" size="large">
        <el-form-item label="用户名">
          <el-input v-model="tempform.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实名">
          <el-input v-model="tempform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="tempform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="tempform.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="tempform.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="tempform.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="角色">
          <el-select v-model="form.modelNum" class="m-2" placeholder="Select" size="small">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item> -->
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">修改</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: "userInfo",
  components: {
    ElMessage,
    ElMessageBox
  },
  data() {
    return {
      form: {
        password: "",
        IDNum: "",
        MailNum: "",
        TelNum: "",
        TrueName: "",
        UserName: "",
        sex: null,
        sexNum: 0,
        model: null,
        // modelNum: 0,
      },
      tempform: {
        idCard: '',
        mail: '',
        name: '',
        nickName: '',
        phone: '',
        sex: '',
      },
      options: [
        {
          value: 1,
          label: '用户',
        },
        {
          value: 2,
          label: '商家',
        }
      ],
      dialogFormVisible: false,
    }
  },
  methods: {
    save() {
      ElMessageBox.confirm(
        '确认修改信息吗',
        'Warning',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        let tokenx = this.$cookies.get("token");
        // this.$store.commit("setmyToken", tokenx);
        // console.log("aaa")
        console.log("end.tokenx");
        console.log(tokenx)
        // console.log(ttoken)
        this.form.sex = this.form.sexNum;
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": tokenx,
            params: this.tempform,
          },
        };
        axios.post("user/modify", config).then(res => {
          console.log(res);
          this.load();
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.tempform.nickName = tmp.nickName;
        this.tempform.name = tmp.name;
        this.tempform.sex = tmp.sex;
        this.tempform.phone = tmp.phone;
        this.tempform.mail = tmp.mail;
        this.tempform.idCard = tmp.idCard;
        ElMessage.info("取消修改");
      })
    },
    load() {
      console.log(this.$cookies.get("token"))
      if (this.$cookies.get("token") == null) {
        ElMessage({
          message: '请先登录',
          type: 'error',
          duration: 800,
          onClose: () => {
            this.$router.push('/login')
          }
        })
        return false;
      }
      if (this.$cookies.get("token") != null) {
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
        axios.post("/user/info", data, config).then(res => {
          console.log(res.data.data.user);
          let tmp = res.data.data.user;
          console.log(tmp.role + "role")
          this.form.UserName = tmp.nickName;
          this.tempform.nickName = tmp.nickName;
          this.$store.commit("setmyName", this.UserName);
          this.form.TrueName = tmp.name;
          this.tempform.name = tmp.name;
          this.form.password = tmp.pwd;
          this.form.sexNum = tmp.sex;
          this.tempform.sex = tmp.sex;
          this.form.sex = tmp.sex == 1 ? "男" : "女";
          this.form.TelNum = tmp.phone;
          this.tempform.phone = tmp.phone;
          this.form.MailNum = tmp.mail;
          this.tempform.mail = tmp.mail;
          // if (tmp.role == 1) {
          //   console.log("yes!!")
          // }
          this.form.modelNum = tmp.role;
          this.form.model = tmp.role == 1 ? "用户" : "商家";
          this.form.IDNum = tmp.idCard;
          this.tempform.idCard = tmp.idCard;
        }).catch(err => {
          console.log(err);
        })
      }
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style scoped>

</style>
