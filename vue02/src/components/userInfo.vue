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
    <div class="button">
    <el-button @click="(dialogFormVisible = true)">修改信息</el-button>
    <el-button @click="(dialogFormVisible2 = true); getAddress()">地址管理</el-button>
    </div>
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
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false; this.load()">取 消</el-button>
        <el-button type="primary" @click="save">修改</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog title="添加地址" v-model="dialogFormVisible2" style="max-width: 60vmin;">
    <template #default>
      <el-table :data="addressList">
        <!-- <el-table-column type="selection" width="40px"/> -->
        <el-table-column prop="province" label="省份" align="center">
        </el-table-column>
        <el-table-column prop="detail" label="详细地址" align="center">
        </el-table-column>
        <el-table-column label="删除地址">
          <template #default="scope">
            <el-button style="width: 8vmin" type="danger" @click.prevent="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false; this.load()">取 消</el-button>
        <el-button type="success" @click="dialogFormVisible3 = true"><el-icon>
            <CirclePlus />
          </el-icon>新 增</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog title="输入地址" v-model="dialogFormVisible3" style="max-width: 60vmin;">
    <template #default>
      <el-form :model="addressForm" ref="userForm">
        <el-form-item prop="province">
          <el-select v-model="addressForm.province" placeholder="选择省份">
            <el-option v-for="item in provinces" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="detail">
          <el-input type="textarea" v-model="addressForm.detail" placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false; this.addressForm = [];">取 消</el-button>
        <el-button type="success" @click="addAddress">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { RESOLVE_COMPONENT } from "@vue/compiler-core";
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
      addressList: [],
      addressForm: {
        province: '',
        detail: '',
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
      provinces: [{ label: "北京市", value: "北京市" },
      { label: "天津市", value: "天津市" },
      { label: "河北省", value: "河北省" },
      { label: "山西省", value: "山西省" },
      { label: "内蒙古自治区", value: "内蒙古自治区" },
      { label: "辽宁省", value: "辽宁省" },
      { label: "吉林省", value: "吉林省" },
      { label: "黑龙江省", value: "黑龙江省" },
      { label: "上海市", value: "上海市" },
      { label: "江苏省", value: "江苏省" },
      { label: "浙江省", value: "浙江省" },
      { label: "安徽省", value: "安徽省" },
      { label: "福建省", value: "福建省" },
      { label: "江西省", value: "江西省" },
      { label: "山东省", value: "山东省" },
      { label: "河南省", value: "河南省" },
      { label: "湖北省", value: "湖北省" },
      { label: "湖南省", value: "湖南省" },
      { label: "广东省", value: "广东省" },
      { label: "广西壮族自治区", value: "广西壮族自治区" },
      { label: "海南省", value: "海南省" },
      { label: "重庆市", value: "重庆市" },
      { label: "四川省", value: "四川省" },
      { label: "贵州省", value: "贵州省" },
      { label: "云南省", value: "云南省" },
      { label: "西藏自治区", value: "西藏自治区" },
      { label: "陕西省", value: "陕西省" },
      { label: "甘肃省", value: "甘肃省" },
      { label: "青海省", value: "青海省" },
      { label: "宁夏回族自治区", value: "宁夏回族自治区" },
      { label: "新疆维吾尔自治区", value: "新疆维吾尔自治区" },
      { label: "台湾省", value: "台湾省" },
      { label: "香港特别行政区", value: "香港特别行政区" },
      { label: "澳门特别行政区", value: "澳门特别行政区" }],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
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
      )
        .then(() => {
          let tokenx = this.$cookies.get("token");
          console.log(token)
          let config = {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": tokenx,
            },
          };
          axios.post("user/modify", this.tempform, config).then(res => {
            console.log(res);
            this.load();
            ElMessage.success("修改成功");
            this.dialogFormVisible = false;
          }
          ).catch(err => {
            console.log(err);
          })
        })
        .catch(() => {
          this.load();
          ElMessage.info("取消修改");
        })
    },
    load() {
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
        let config = {
          headers: {
            "Content-Type": "multipart/form-data ",
            "Authorization": tokenx,
          },
        };
        axios.post("/user/info", data, config).then(res => {
          let tmp = res.data.data.user;
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
          this.form.modelNum = tmp.role;
          this.form.model = tmp.role == 1 ? "用户" : "商家";
          this.form.IDNum = tmp.idCard;
          this.tempform.idCard = tmp.idCard;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    getAddress() {
      let tokenx = this.$cookies.get("token");
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          "Authorization": tokenx,
        },
      };
      axios.get("/addr/list", config).then(res => {
        this.addressList = res.data.data.addrList
        console.log(this.addressList);
      }).catch(err => {
        console.log(err);
      })
    },
    addAddress() {
      let tokenx = this.$store.getters.myToken;
      console.log(this.addressForm)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          "Authorization": tokenx,
        },
        params:{
          "province":this.addressForm.province,
          "detail":this.addressForm.detail
        }
      };
      this.axios.get("/addr/add",config).then(res => {
        this.dialogFormVisible2 = false;
        this.dialogFormVisible3 = false;
        console.log(res)
        this.addressForm = [];
        if(res.data.code === 100){
          ElMessage.success("添加成功");
          this.load()
        }else{
          ElMessage.success("添加失败");
          this.load()
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handleDelete(deleteid) {
      ElMessageBox.confirm(
        '删除后无法恢复',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        let tokenx = this.$cookies.get("token");
        console.log(tokenx)
        let config = {
          headers: {
            "Content-Type": "multipart/form-data ",
            "Authorization": tokenx,
          },
        };
        this.axios.delete("/addr/del", {
          params: {
            "id": deleteid
          }
        }, config).then(res => {
          this.dialogFormVisible2 = false
          ElMessage.success("删除成功")
          console.log(res);
          this.load()
        }).catch(err => {
          console.log(err);
        })
      })
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style scoped>
.button{
  display: flex;
  justify-content: center;
}
</style>
