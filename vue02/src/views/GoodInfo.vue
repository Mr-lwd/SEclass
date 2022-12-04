<template>
  <div style="display:flex; align-items: center;">
    <div style="width: 500px; margin-left: 300px">
    <img :src="img[0].url" alt="" style="width: 100%;"/>
    </div>
    <div style="width: 500px; margin-left: 100px">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>商品信息</span>
          </div>
        </template>
        <div>
          <el-descriptions title="商品信息" class="info">

              <el-descriptions-item label="商品名" class="detail">{{item.name}}</el-descriptions-item>


              <el-descriptions-item label="商品细节" class="detail">{{item.detail}}</el-descriptions-item>

              <el-descriptions-item label="商品价格" class="detail">{{item.price}}</el-descriptions-item>

             <el-descriptions-item label="商品库存" class="detail">
               {{item.store}}
             </el-descriptions-item>


              <el-descriptions-item label="商品销量" class="detail">{{item.sale}}</el-descriptions-item>

          </el-descriptions>
        </div>
        <div style="text-align: center; margin-top: 30px; display: flex; justify-content: center">
          <p style="margin-right: 20px; font-size: 15px">购买数：</p>
          <el-input-number v-model="num" :min="1" :max="item.store" />
        </div>
        <div style="text-align: center;margin-top: 20px">
          <el-button @click="goToCart(item.id)">加入购物车</el-button>
          <el-button>立即购买</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GoodInfo",
  data(){
    return{
      num:1,
      item: {
        "id":23,
        "name":"jzh",
        "detail":"jzh",
        "price":40,
        "store":11,
        "sale":10,
        "gmtCreate":"2022-12-03T11:26:07",
        "gmtModify":null,
        "deleted":false
      },
      img: ['https://slynium-mall.oss-cn-hangzhou.aliyuncs.com/202cd611-3a0d-485d-a596-d2fd18c63df0.png'],
      imglist: null,
    }
  },
  mounted() {
    this.item =  JSON.parse(this.$route.query.item);
    if(JSON.parse(this.$route.query.img).length > 0)
    this.img = JSON.parse(this.$route.query.img);
    console.log(this.img);
    let immg  = [];
    if(this.img.length > 0) {
      for (let i = 0; i < this.img.length; i++) {
        immg.push(this.img[i].url);
      }
      this.imglist = immg;
    }
    console.log(immg);
    console.log(this.img[0].url)
  },
  methods:{
    goToCart(id) {
      console.log(id);
      let url = "shop/add"
      let data = new FormData();
      data.append("goodsId",id);
      //后面加一个加减
      data.append("num",this.num);
      // console.log(this.num);
      let tokenx = this.$cookies.get("token");
      this.$store.commit("setmyToken", tokenx);
      let Mytoken = this.$store.getters.myToken;
      console.log(Mytoken)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          "Authorization": Mytoken,
        },
      };
      axios.post(url,data,config).then(res=>{
        console.log(res);
        alert("添加成功");
      }).catch(err=>{
        console.log(err);
      })
    },
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";

.detail
{
  width: 200px;
}


</style>
