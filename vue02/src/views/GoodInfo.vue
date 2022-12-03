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
          <el-descriptions title="商品信息">
            <el-descriptions-item label="商品名">{{item.name}}</el-descriptions-item>
            <el-descriptions-item label="商品细节">{{item.detail}}</el-descriptions-item>
            <el-descriptions-item label="商品价格">{{item.price}}</el-descriptions-item>
            <el-descriptions-item label="商品库存">
              <el-tag size="small">{{item.store}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="商品销量">{{item.sale}}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div style="text-align: center;margin-top: 30px">
          <el-button>加入购物车</el-button>
          <el-button>立即购买</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodInfo",
  data(){
    return{
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
    this.img = JSON.parse(this.$route.query.img);
    console.log(this.img);
    let immg  = [];
    for(let i = 0; i < this.img.length; i++)
    {
      immg.push(this.img[i].url);
    }
    this.imglist = immg;
    console.log(immg);
    console.log(this.img[0].url)
  }
};
</script>

<style scoped>

</style>
