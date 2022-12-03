<template>
  <el-container>
    <el-container>
      <asideMenu style="max-width: 20vmin;"></asideMenu>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      <navFooter></navFooter>
    </el-footer>
  </el-container>

</template>

<script>
// @ is an alias to /src
import asideMenu from "@/components/AsideMenu.vue";
import navFooter from "@/components/NavFooter.vue";

export default {
  name: "ManageView",
  components: {
    navFooter,
    asideMenu,
  },
};
</script>
<style lang="scss">

</style>
