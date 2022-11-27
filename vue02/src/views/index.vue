<template>
  <div class="index">
    <div class="container">
      <!-- <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item, i) in menuList" v-bind:key="i">
                  <li v-for="(sub, j) in item" v-bind:key="j">
                    <a v-bind:href="sub ? '/#/product/' + sub.id : ''">
                      <img
                        v-bind:src="sub ? sub.img : '/imgs/item-box-1.png'"
                        alt=""
                      />
                      {{ sub ? sub.name : "小米9" }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
      </div> -->
      <!-- <div class="ads-box">
        <a v-bind:href="'/#/product/' + item.id" v-for="(item, index) in adsList" v-bind:key="index">
          <img v-lazy="item.img" alt="">
        </a>
      </div> -->
      <!-- <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="" />
        </a>
      </div> -->
    </div>
    <div class="product-box">
      <div class="container">
        <h2>热销商品</h2>
        <div class="wrapper" v-if="goodList">
          <div class="banner-left">
            <a href="javascript:;"><img src="../assets/logo.png" alt="" /></a>
          </div>
          <div class="list-box" v-if="goodList">
            <div class="list" v-for="(arr, i) in goodList" v-bind:key="i">
              <div class="item" v-for="(item, j) in arr" v-bind:key="j">
                <div class="item-img" v-if="item.photos[0]">
                  <img :src="item.photos[0].url" alt="" />
                </div>
                <div class="item-img" v-if="!item.photos[0]">
                  <img src="../assets/logo.png" alt="" />
                </div>
                <div class="item-info">
                  <h3>{{ item.goods.name }}</h3>
                  <p>{{ item.goods.detail }}</p>
                  <p class="price" @click="addCart(item.goods.id)">
                    {{ item.goods.price }}元
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <service-bar></service-bar>
    <modal title="提示" sureText="查看购物车" btnType="1" modalType="middle" v-bind:showModal="showModal"
      v-on:submit="goToCart" v-on:cancel="showModal = false">
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal> -->
  </div>
</template>
<script>
export default {
  name: "myIndex",
  components: {},
  data() {
    return {
      adsList: [
        {
          id: 33,
          img: "../assets/logo.png",
        },
        {
          id: 48,
          img: "../assets/logo.png",
        },
        {
          id: 45,
          img: "../assets/logo.png",
        },
        {
          id: 47,
          img: "../assets/logo.png",
        },
      ],
      goodList: [],
      showModal: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios
        .get("/goods/list?pageNum=1&pageSize=10")
        .then((res) => {
          console.log(res.data.data.goodsList);
          this.goodList = [
            res.data.data.goodsList.slice(0, 4),
            res.data.data.goodsList.slice(4, 8),
          ];
          console.log(this.goodList[1]);
          // console.log(this.goodList[1][2].photos);
        })
        .catch((e) => {});
    },
    addCart(id) {
      // this.axios.post('/carts',{
      //   productId:id,
      //   selected: true
      // }).then((res)=>{
      //   this.showModal = true;
      //   this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
      // });
    },
    goToCart() {
      // this.$router.push('/cart');
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";

.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      box-sizing: border-box;

      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;

          a {
            position: relative;
            display: block;
            font-size: 16px;
            color: #ffffff;
            padding-left: 30px;

            &:after {
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: " ";
              @include bgImg(10px, 15px, "../assets/logo.png");
            }
          }

          &:hover {
            background-color: $colorA;

            .children {
              display: block;
            }
          }

          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;

            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;

              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
              }

              a {
                color: $colorB;
                font-size: 14px;
              }

              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }

    .swiper-container {
      height: 451px;

      .swiper-button-prev {
        left: 274px;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;

    a {
      width: 296px;
      height: 167px;
    }
  }

  .banner {
    margin-bottom: 50px;
  }

  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;

    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }

    .wrapper {
      display: flex;

      .banner-left {
        margin-right: 16px;

        img {
          width: 224px;
          height: 619px;
        }
      }

      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;

          &:last-child {
            margin-bottom: 0;
          }

          .item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;

            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              color: $colorG;

              &.new-pro {
                background-color: #7ecf68;
              }

              &.kill-pro {
                background-color: #e82626;
              }
            }

            .item-img {
              img {
                width: 100%;
                height: 195px;
              }
            }

            .item-info {
              h3 {
                font-size: $fontJ;
                color: $colorB;
                line-height: $fontJ;
                font-weight: bold;
              }

              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }

              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;

                &:after {
                  @include bgImg(22px, 22px, "../assets/logo.png");
                  content: " ";
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
