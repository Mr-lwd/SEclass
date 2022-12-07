<template>

</template>
  <div>
  <el-image :src="ERCodeUrl"></el-image>
  </div>
<script>
import axios from "axios";

export default {
  name: "OrderList",
  data(){
    return{
        ERCodeUrl : "https://api.qrserver.com/v1/create-qr-code/?size=150×150&data={'money':0,'username':'test'}",
    }
  },
  methods:{

  }
};
</script>

<style scoped>

</style>
