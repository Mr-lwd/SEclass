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
          <el-table ref="multipleTableRef" :data="select" style="width: 100%" v-if="fromPage == 1">
            <el-table-column property="goodsVo.goods.name" label="商品" width="120" />
            <el-table-column property="goodsVo.goods.price" label="商品单价" show-overflow-tooltip />
            <el-table-column property="shop.num" label="商品数" show-overflow-tooltip></el-table-column>
            <el-table-column property="sum" label="价格" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="buybuybuy" v-if="fromPage == 0">
            <div>商品名字：{{item.name}}</div>
            <div>商品信息：{{item.detail}}</div>
            <div>单价:{{item.price}}</div>
            <div>购买数量:{{this.sumall/this.item.price}}</div>
          </div>
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

          <div style="text-align: center">
            地址:{{address}}
          </div>
          <div style="text-align: center">
            <el-button text @click="getAddress">
              选择收货地址
            </el-button>
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
    <div style="display: flex; justify-content: center">
    <el-button @click="selectAddrID" style="margin: 20px 0;">确认</el-button>
    </div>
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
      address : "未选择地址",
      addressid: -1,
      dialogTableVisible: false,
      addressList: [],
      selectAddId: 0,
      fromPage : -1,
      item: null
  }
  },
  mounted() {
      this.fromPage = JSON.parse(this.$route.query.from);
      // console.log(this.fromPage);
      if(this.fromPage == 1) {
        this.sumall = JSON.parse(this.$route.query.money);
        this.select = JSON.parse(this.$route.query.select);
        // console.log(this.sumall);
        // console.log(this.select);
        this.ERCodeUrl = this.baseUrl + "sum:" + JSON.stringify(this.sumall) + "  detail:" + JSON.stringify(this.select);
      }
      else
      {
        this.sumall = JSON.parse(this.$route.query.money);
        this.item = JSON.parse(this.$route.query.select);
        this.ERCodeUrl = this.baseUrl + "sum:" + JSON.stringify(this.sumall) + "  detail:" + JSON.stringify(this.item);
        // console.log("xx");
        // console.log(this.item)
      }
  },
  methods:{
    selectAddrID()
    {
      // console.log(this.addressid);
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
        // console.log(this.addressList);
      }).catch(err => {
        // console.log(err);
        ElMessage.error("获取信息失败");
      })
    },
    goback()
    {
      this.$router.push("/ShopCar");
    },
    addOrderList()
    {
      if(this.select != null || this.item != null) {
        if(this.addressid != -1) {
          if(this.fromPage == 1) {
            let url = "orders/add";
            let tokenx = this.$cookies.get("token");
            // console.log(tokenx)
            let config = {
              headers: {
                "Content-Type": "multipart/form-data ",
                "Authorization": tokenx,
              },
            };
            let t = this.select;
            let len = t.length;
            for (let i = 0; i < len; i++) {
              // console.log(t[i]);
              let data = new FormData();
              data.append("addrId", this.addressid);
              // console.log(this.addressid);
              data.append("goodsId", t[i].shop.goodsId);
              // console.log(t[i].shop.goodsId)
              data.append("num", t[i].shop.num)
              // console.log(t[i].shop.num)
              data.append("state", 1)
              // console.log(1)
              data.append("totalPrice", t[i].sum);
              // console.log(t[i].sum)
              // console.log(t[i].sum)
              axios.post(url, data, config).then(res => {
                // console.log(res);
                // console.log("添加成功");
                ElMessage.success("添加成功");
              }).catch(err => {
                // console.log(err);
                ElMessage.error("添加失败");
              })
              let url2 = "shop/del"
              let config2 = {
                headers: {
                  "Content-Type": "multipart/form-data ",
                  "Authorization": tokenx
                },
                params: {
                  id: this.select[i].shop.id
                }
              };
              axios.delete(url2, config2).then(
                res => {
                  // console.log(res);
                  // console.log("ok");
                  ElMessage.success("删除成功");
                }
              ).catch(err => {
                // console.log(err);
                ElMessage.error("删除失败");
              })
              // console.log(this.select.shop.id);
              // console.log(this.select[i].shop.id)
            }
          }
          else {
            let data = new FormData();
            // console.log(this.item);
            data.append("addrId", this.addressid);
            // console.log(this.addressid);
            data.append("goodsId",this.item.id);
            // console.log(t[i].shop.goodsId)
            data.append("num", this.sumall/this.item.price);
            // console.log(t[i].shop.num)
            data.append("state", 1)
            // console.log(1)
            data.append("totalPrice", this.sumall);
            // console.log(t[i].sum)
            // console.log(t[i].sum)
            // axios.post(url, data, config).then(res => {
            //   console.log(res);
            //   console.log("添加成功");
            // }).catch(err => {
            //   console.log(err);
            // })
          }
        }
        else {
          // alert("请选择地址");
          ElMessage.info("请选择地址");
        }
      }
      else {
        // alert("请添加商品");
        ElMessage.info("请添加商品");

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
      width: 430px;
      .buybuybuy{
        font-size: 15px;
        div{
          margin: 10px 0;
        }
      }
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
