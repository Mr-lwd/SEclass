<template>
  <div class="box">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>订单信息</span>
        </div>
      </template>
      <div class="card-body">
        <div class="orderList">
          <el-table ref="multipleTableRef" :data="select" style="width: 100%">
            <el-table-column property="goodsVo.goods.name" label="商品" width="120" />
            <el-table-column property="goodsVo.goods.price" label="商品单价" show-overflow-tooltip />
            <el-table-column property="shop.num" label="商品数" show-overflow-tooltip></el-table-column>
            <el-table-column property="sum" label="价格" show-overflow-tooltip></el-table-column>
          </el-table>

        </div>

        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div class="sumall">
          总价格：{{sumall}}
        </div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div>
          <div>
          <el-button text @click="getAddress">
            选择收货地址
          </el-button>
          </div>
          <div>
            地址:{{address}}
          </div>
        </div>

        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
      <div class="QRCode">
        <el-image :src="ERCodeUrl"></el-image>
      </div>
        <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
        <div class="buttons">
          <el-button class="el-button" type="danger" plain @click="goback">未支付</el-button>
          <el-button class="el-button" type="success" plain @click="addOrderList">已支付</el-button>
        </div>
      </div>
    </el-card>
  </div>
  <el-dialog v-model="dialogTableVisible" title="收货地址">
    <el-table :data="addressList">
      <!-- <el-table-column type="selection" width="40px"/> -->
      <el-table-column prop="province" label="省份" align="center">
      </el-table-column>
      <el-table-column prop="detail" label="详细地址" align="center">
      </el-table-column>
      <el-table-column label="选择">
        <template #default="scope">
          <el-radio v-model="addressid" :label="scope.row.id">选择</el-radio>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="selectAddrID">确认</el-button>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "PayList",
  data(){
    return{
      ERCodeUrl : "https://api.qrserver.com/v1/create-qr-code/?size=150×150&data={'money':0,'username':'test'}",
      baseUrl : "https://api.qrserver.com/v1/create-qr-code/?size=150×150&data=",
      sumall : 0,
      select : null,
      address : "北京",
      addressid: 0,
      dialogTableVisible: false,
      addressList: [],
      selectAddId: 0,
  }
  },
  mounted() {
      this.sumall = JSON.parse(this.$route.query.money);
      this.select = JSON.parse(this.$route.query.select);
      console.log(this.sumall);
      console.log(this.select);
      this.ERCodeUrl = this.baseUrl + "sum:" + JSON.stringify(this.sumall) +"  detail:"+ JSON.stringify(this.select);
  },
  methods:{
    selectAddrID()
    {
      console.log(this.addressid);
      for(let i = 0; i < this.addressList.length; i++)
      {
        if(this.addressList[i].id == this.addressid)
        {
          this.address = this.addressList[i].detail;
        }
      }
      this.dialogTableVisible = false;
    },
    getAddress() {
      this.dialogTableVisible = true
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
    goback()
    {
      this.$router.push("/ShopCar");
    },
    addOrderList()
    {
      let url = "orders/add";
      let tokenx = this.$cookies.get("token");
      let config = {
          headers: {
            "Content-Type": "multipart/form-data ",
            "Authorization": tokenx,
          },
        };
      let t = this.select;
      let len = t.length;
      for(let i = 0; i < len; i++)
      {
        console.log(t[i]);
        let data = new FormData();
        data.append("addrId", this.addressid);
        // console.log(t[i].shop.userId)
        data.append("goodsId", t[i].shop.goodsId);
        data.append("num", t[i].shop.num)
        data.append("state", 1)
        data.append("gmtPay", new Date());
        data.append("totalPrice", t[i].sum);
        // console.log(t[i].sum)
        axios.post(url,data,config).catch(res=>{
          console.log(res);
          console.log("添加成功");
        }).catch(err=>{
          console.log(err);
        })
      }

    }
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.box{
  //width: 600px;
  height: 100vmin;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .card-header{
    font-weight: bolder;
    font-size: x-large;
    text-align: center;
  }
  .card-body{
    .orderList{
      text-align: center;
      margin-bottom: 20px;
    }
    .sumall{
      font-size: large;
      text-align: center;
      margin-bottom: 20px;
    }
    .QRCode{
      text-align: center;
    }
    .buttons{
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
      .el-button{
        width: 100px;
        height: 40px;
        margin: 0 30px;
      }
    }
  }
}
</style>
