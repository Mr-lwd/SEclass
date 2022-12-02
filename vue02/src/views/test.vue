<template>
  <div></div>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "test",
  setup(){
    const { proxy } = getCurrentInstance(); // 使用proxy代替ctx，因为ctx只在开发环境有效
    onMounted(() => {
      console.log(proxy, "proxy");
    });
  }
};
</script>

<style scoped>

</style>
