<template>
  <div class="home">
    <navHeader></navHeader>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <navFooter></navFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import navFooter from "@/components/NavFooter.vue";
import navHeader from "@/components/NavHeader.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    navFooter,
    navHeader
  },
};
</script>
