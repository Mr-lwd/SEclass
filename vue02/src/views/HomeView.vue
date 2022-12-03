<template>
    <navHeader></navHeader>
    <router-view></router-view>
    <navFooter></navFooter>
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
