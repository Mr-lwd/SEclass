<template>
    <router-view></router-view>
    <navFooter></navFooter>
</template>

<script>
// @ is an alias to /src
import navFooter from "@/components/NavFooter.vue";
import navHeader from "@/components/NavHeader.vue";

export default {
  name: "ManageView",
  components: {
    navFooter,
    navHeader,
  },
};
</script>
