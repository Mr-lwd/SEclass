<template>
    <div class="index">
      <navHeader></navHeader>
      <router-view></router-view>
      <navFooter></navFooter>
    </div>
</template>

<script>
// @ is an alias to /src
import navFooter from "@/components/NavFooter.vue";
import navHeader from "@/components/NavHeader.vue";


export default {
  name: "HomeView",
  components: {
    navFooter,
    navHeader,
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
//.index{
//  display: flex;
//  flex-direction: column;
//  width: 100%;
//  min-height: 100%;
//  flex-flow: row wrap;
//  .footer{
//    width: 100%;
//    height: 100%;
//    align-self: flex-end;
//  }
//}
</style>
