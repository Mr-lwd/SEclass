<template>
<!--购物车-->
  <div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="Date" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="Name" width="120" />
      <el-table-column property="address" label="Address" show-overflow-tooltip />
    </el-table>
    <el-button @click="getAllSelected">sss</el-button>
  </div>
</template>

<script>
import { ElTable } from 'element-plus'
import { getCurrentInstance, ref, toRefs } from "vue";

export default {
  name: "ShopCart",
  data(){
    return{
      multipleSelection:null,
      tableData:[
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
    this.tableData.forEach(row=>{
      ultipleTabInstance.toggleRowSelection.value(row,undefined);
    })
  },
  methods:{
    handleSelectionChange(val){
      this.multipleSelection = val;
      console.log(val);
    },
    getAllSelected()
    {

    }
    }
  };
</script>

<style scoped>

</style>
