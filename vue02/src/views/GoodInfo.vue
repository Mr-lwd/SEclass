<template>
  <div>
    {{item.id}}
  </div>
</template>

<script>
export default {
  name: "GoodInfo",
  data(){
    return{
      item: {
        "id":23,
        "name":"jzh",
        "detail":"jzh",
        "price":40,
        "store":11,
        "sale":10,
        "gmtCreate":"2022-12-03T11:26:07",
        "gmtModify":null,
        "deleted":false
      }
    }
  },
  mounted() {
    this.item =  JSON.parse(this.$route.query.item);
  }
};
</script>

<style scoped>

</style>
