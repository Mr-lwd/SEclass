<template>
  <div style="width: 40vmin; margin: 0 auto">
    <button type="button" v-on:click="fangWen" class="btn btn-primary">
      查找商品列表
    </button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    fangWen: function () {
      this.axios
        .get("/goods/list")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
