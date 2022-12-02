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
      <el-table-column property="goodsId" label="商品ID" width="120" />
      <el-table-column property="num" label="商品数" show-overflow-tooltip />
      <el-table-column property="num" label="商品单价" show-overflow-tooltip />
      <el-table-column property="num" label="总价" show-overflow-tooltip />
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
      resList : null,
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-08',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-06',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-07',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],

    }
  },
  mounted() {
    const internalInstance = getCurrentInstance(); // 有效
    console.log(internalInstance);
    let ultipleTabInstance = toRefs(internalInstance.refs.multipleTableRef);
    console.log(ultipleTabInstance);
    this.tableData.forEach(row => {
      ultipleTabInstance.toggleRowSelection.value(row, undefined);
    })
    let url = "shop/list"
    let data = new FormData();
    let tokenx = this.$cookies.get("token");
    this.$store.commit("setmyToken", tokenx);
    let ttoken = this.$store.getters.myToken;
    console.log(ttoken)
    let config = {
      headers: {
        "Content-Type": "multipart/form-data ",
        "Authorization": tokenx,
      },
    };
    axios.get(url,data,config).then(res=>{
      console.log(res.data.data);
      let tmp = [];
      let Myreslist = res.data.data.shopList
      let len = Myreslist.length;
      for (let i = 0; i < len; i++) {
        tmp.push(Myreslist[i]);
      }
      this.resList = tmp;
    }).catch(err=>{
      console.log(err);
    })
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
