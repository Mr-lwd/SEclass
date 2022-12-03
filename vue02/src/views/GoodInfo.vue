<template>
  <div>
    {{item.id}}
    {{img}}
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
      },
      img:{

      }
    }
  },
  mounted() {
    this.item =  JSON.parse(this.$route.query.item);
    this.img = JSON.parse(this.$route.query.img);
  }
};
</script>

<style scoped>

</style>
