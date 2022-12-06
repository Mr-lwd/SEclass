<template>
  <div class="footer">
    <div class="footer-logo">
      <el-icon style="color: #ff6600;font-size: 5vmin;"><GoodsFilled /></el-icon>
      <p>0元购商城</p>
    </div>
    <div class="footer-link">
      JZH<span>|</span>
      YYK<span>|</span>
      LWD<span>|</span>
      MYX
    </div>
    <div class="copyright">
      Copyright ©2022 <span class="domain">课设商城</span> All Rights
      Reserved.
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-footer",
};
</script>
<style lang="scss" scoped>
.footer {
  a {
    text-decoration: none;
  }
  height: 234px;
  border-top: 4px solid #ff6600;
  background-color: #333333;
  color: #999999;
  font-size: 16px;
  text-align: center;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    a {
      color: #999999;
      display: inline-block;
    }
    span {
      margin: 0 10px;
    }
    margin-bottom: 13px;
  }
  .copyright {
    .domain {
      color: #ff6600;
    }
  }
}
</style>
