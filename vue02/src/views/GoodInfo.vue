<template>
  <div>
    {{id}}
  </div>
</template>

<script>
export default {
  name: "GoodInfo",
  data(){
    return{
      id: null
    }
  },
  mounted() {
    this.id =  JSON.parse(this.$route.query.id);
  }
};
</script>

<style scoped>

</style>
