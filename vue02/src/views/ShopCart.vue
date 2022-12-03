<template>
<!--购物车-->
  <div>
    <el-table
      ref="multipleTableRef"
      :data="resList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="goodsVo.goods.name" label="商品" width="120" />
      <el-table-column property="goodsVo.goods.price" label="商品单价" show-overflow-tooltip />
      <el-table-column property="shop.num" label="商品数" show-overflow-tooltip />
      <el-table-column  property="shop.num" label="总价" show-overflow-tooltip />
      <el-table-column label="选择" >
        <template #default="scope">
          <el-button @click="console.log(scope.row)">详细</el-button>
          <el-button @click="console.log(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ElTable } from 'element-plus'
import { getCurrentInstance, ref, toRefs } from "vue";
import axios from "axios";

export default {
  name: "ShopCart",
  data() {
    return {
      multipleSelection: null,
      resList: null,
      sum: null,
    }
  },
  mounted() {
    let url = "shop/list"
    let data = new FormData();
    let tokenx = this.$cookies.get("token");
    console.log(tokenx);
    this.$store.commit("setmyToken", tokenx);
    let ttoken = this.$store.getters.myToken;
    console.log(ttoken)
    let config = {
      headers: {
        "Content-Type": "multipart/form-data ",
        "Authorization": tokenx,
      },
    };
    axios.get(url,config).then(res=>{
      console.log(res);
      let tmp = [];
      let price = 0;

      let Myreslist = res.data.data.shopVoList;
      let len = Myreslist.length;
      for (let i = 0; i < len; i++) {
        let ttmp = [];
        ttmp.push(Myreslist[i].shop);
        price = Myreslist[i].goodsVo.goods.price * Myreslist[i].shop.num;
        ttmp.push({"sum": price});
        tmp.push(ttmp);
      }
      this.resList = tmp;
      console.log(tmp)
    }).catch(err=>{
      console.log(err);
    })

    // const internalInstance = getCurrentInstance(); // 有效
    // console.log(internalInstance);
    // let ultipleTabInstance = toRefs(internalInstance.refs.multipleTableRef);
    // console.log(ultipleTabInstance);
    // this.tableData.forEach(row => {
    //   ultipleTabInstance.toggleRowSelection.value(row, undefined);
    // })

  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    }
  }
}
</script>

<style scoped>

</style>
