<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="!username" @click="register">注册</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="goToUserInfo">{{
              username
          }}</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"><i class="bi bi-cart-fill"></i>购物车<span
              class="badge bg-secondary">1111</span></a>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid" style="padding: 0 40vmin 0 40vmin">
        <i class="bi bi-shop" style="font-size: 6vmin; color: #ff6600"></i>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" style="font-size: 2vmin; margin-left: 2vmin" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" @click="gotoIndex" aria-current="page" href="#">首页</a>
            </li>
              <li class="nav-item" v-if="(role != null)" @click="goToUserInfo">
                <a class="nav-link" href="#" >个人中心</a>
              </li>
              <li class="nav-item" v-if="(role == 1)">
                <a class="nav-link" @click="gotoUpload" href="#">添加商品</a>
              </li>
              <li class="nav-item" v-if="(role != null)">
                <a class="nav-link" href="#">消息列表</a>
              </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="输入商品名称" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit" style="background-color: #ff6600">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
// import {mapState} from 'vuex'
export default {
  name: "nav-header",
  data() {
    return {
      goodList: [],
      username:'',
      role: null,
    };
  },
  mounted() {
    this.setusername();
    this.setrole();
  },
  methods: {
    setusername() {
      // return this.$store.state.username;
      this.username = this.$cookies.get("username");
      return this.$cookies.get("username");
    },
    setrole() {
      this.role = this.$cookies.get("role");
      return this.$cookies.get("role");
    },
    login() {
      this.$router.push({
        name: "login",
      });
    },
    register() {
      this.$router.push({
        name: "register",
      });
    },
    getProductList() {
      //   this.getProductList();
      //   this.axios.get('goods/list').then((res)=>{
      //     this.goodList = res.goodsList;
      //   })
    },
    goToUserInfo() {
      this.$router.push({
        name: "userInfo"
      })
    },
    gotoIndex() {
      this.$router.push({
        name: "home"
      })
    },
    gotoUpload() {
      this.$router.push('/upload')
    },
    getCartCount() { },
    logout() {
      // localStorage.clear()
			// window.sessionStorage.clear()
      this.$store.commit("logout");
      this.$cookies.remove("token");
      this.$cookies.remove("role");
      this.$cookies.remove("username");
      this.$router.push("/login");
    },
    goToCart() {
      this.$router.push("/ShopCar");
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";

.header {
  a {
    text-decoration: none;
  }

  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;

    .container {
      @include flex();

      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }

      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #ffffff;
        margin-right: 0;

        .icon-cart {
          @include bgImg(16px, 12px, "../assets/logo.png");
          margin-right: 4px;
        }
      }
    }
  }

  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();

      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;

        .item-menu {
          display: inline-block;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;

          span {
            cursor: pointer;
          }

          &:hover {
            color: $colorA;

            .children {
              height: 220px;
              opacity: 1;
            }
          }

          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            transition: all 0.5s;
            background-color: #ffffff;

            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;

              a {
                display: inline-block;
              }

              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }

              .pro-img {
                height: 137px;
              }

              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }

              .pro-price {
                color: $colorA;
              }

              &:before {
                content: " ";
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }

              &:last-child:before {
                display: none;
              }
            }
          }
        }
      }

      .header-search {
        width: 319px;

        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;

          input {
            border: none;
            box-sizing: border-box;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }

          a {
            @include bgImg(18px, 18px, "../assets/logo.png");
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>
