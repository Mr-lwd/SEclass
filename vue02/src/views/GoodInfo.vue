<template>
  <div style="display:flex; align-items: center; margin-bottom: 70px; margin-top: 30px">
    <div style="width: 500px;  margin-left: 300px; margin-right: 0px">
      <swiper
        :modules="modules"
        :loop="true"
        :slides-per-view="1"
        :space-between="50"
        :autoplay="{ autoplay: true, delay: 1000, disableOnInteraction: false }"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
        style="height: 540 px;width:60vmin"
        effect="cards"
        v-if="isImg==1"
      >
        <swiper-slide class="swiper-slide" v-for="(item, i) in img" :key="i" style="width: 100%"  >
          <img :src="item.url" alt="" style="width: 100%"  />
        </swiper-slide>
      </swiper>
      <img src="../assets/noImg.png" alt=""  style="width: 100%;" v-if="isImg==0"/>
    </div>
    <div style="width: 500px; margin-left: 100px">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>商品信息</span>
          </div>
        </template>
        <div>
          <el-descriptions title="商品信息" class="info"  :column="1">

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
          <el-button @click="buybuybuy">立即购买</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Swiper } from "swiper/vue";
import { SwiperSlide } from "swiper/vue";
import 'swiper/css';
import 'swiper/css/bundle';
import "swiper/css/effect-cards";
import { Autoplay, Navigation, Pagination, Scrollbar,EffectCards} from "swiper";
import { ElMessage } from "element-plus";
export default {
  name: "GoodInfo",
  components:{
    Swiper,
    SwiperSlide,
    Autoplay,
    Pagination,
    Navigation,
    Scrollbar,
    EffectCards
  },
  data(){
    return{
      num:1,
      isImg : 0,
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
      img: [],
      imglist: null,
      modules: [Pagination, Navigation,Autoplay,EffectCards],
    }
  },
  // setup() {
  //   // const onSwiper = (swiper) => {
  //   //   console.log(swiper);
  //   // };
  //   // const onSlideChange = () => {
  //   //   console.log('slide change');
  //   // };
  //   // return {
  //   //   onSwiper,
  //   //   onSlideChange,
  //   // };
  //
  // },
  mounted() {
    this.isImg = 0;
    this.item =  JSON.parse(this.$route.query.item);
    if(JSON.parse(this.$route.query.img).length > 0)
    this.img = JSON.parse(this.$route.query.img);
    // console.log(this.img);
    let immg  = [];
    if(this.img.length > 0) {
      this.isImg = 1;
      // console.log(this.isImg);
      for (let i = 0; i < this.img.length; i++) {
        immg.push(this.img[i].url);
      }
      this.imglist = immg;
    }

    // console.log(immg);
    // console.log(this.img[0].url)
    // let mySwiper = new Swiper ('.swiper', {
    //   direction: 'vertical', // 垂直切换选项
    //   loop: true, // 循环模式选项
    //
    //   // 如果需要分页器
    //   pagination: {
    //     el: '.swiper-pagination',
    //   },
    //
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    //
    //   // 如果需要滚动条
    //   scrollbar: {
    //     el: '.swiper-scrollbar',
    //   },
    // })
  },
  methods:{
    goToCart(id) {
      // console.log(id);
      let url = "shop/add"
      let data = new FormData();
      data.append("goodsId",id);
      //后面加一个加减
      data.append("num",this.num);
      // console.log(this.num);
      let tokenx = this.$cookies.get("token");
      this.$store.commit("setmyToken", tokenx);
      let Mytoken = this.$store.getters.myToken;
      // console.log(Mytoken)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          "Authorization": Mytoken,
        },
      };
      axios.post(url,data,config).then(res=>{
        // console.log(res);
        if(res.data.code == 100)
        // alert("添加成功");
        ElMessage.success("添加成功");
        else {
          // alert("添加失败");
          ElMessage.error("添加失败");
        }
      }).catch(err=>{
        // console.log(err);
        // alert("添加失败");
        ElMessage.error("添加失败");
      })
    },
    buybuybuy()
    {
      // console.log(this.item.price * this.num);
      // console.log(this.item);
      this.$router.push({
        path:'/pay',
        query:{
          money: JSON.stringify(this.item.price * this.num),
          select: JSON.stringify(this.item),
          from: JSON.stringify(0)
        }
      });
    }
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
.swiper {
  width: 600px;
  height: 300px;
}

</style>
