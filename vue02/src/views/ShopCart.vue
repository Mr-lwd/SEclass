<template>
  <!--购物车-->
  <div>
    <el-table ref="multipleTableRef" :data="resList" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="goodsVo.goods.name" label="商品" width="120" />
      <el-table-column property="goodsVo.goods.price" label="商品单价" show-overflow-tooltip />
      <el-table-column property="shop.num" label="商品数" show-overflow-tooltip>
        <template #default="scope">
          <el-input-number v-model="scope.row.shop.num" :min="1" :max="scope.row.goodsVo.goods.store" @change="handleChange(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column property="sum" label="总价" show-overflow-tooltip />
      <el-table-column label="选择">
        <template #default="scope">
          <el-button @click="gotoInFo(scope.row.goodsVo)">详细</el-button>
          <el-popconfirm title="是否要删除"
                         confirm-button-text="是"
                         cancel-button-text="否"
                         @confirm="deleteCart(scope.row)">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 30px; margin-bottom: 30px">
      总价格：{{ sumAll }}
      <div style="margin-top: 20px">
        <el-button @click="gotoPay">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElTable } from "element-plus";
import axios from "axios";

export default {
  name: "ShopCart",
  data() {
    return {
      multipleSelection: null,
      resList: null,
      sum: null,
      sumAll: 0
    }
  },
  mounted() {
    this.load()

    // const internalInstance = getCurrentInstance(); // 有效
    // console.log(internalInstance);
    // let ultipleTabInstance = toRefs(internalInstance.refs.multipleTableRef);
    // console.log(ultipleTabInstance);
    // this.tableData.forEach(row => {
    //   ultipleTabInstance.toggleRowSelection.value(row, undefined);
    // })

  },
  methods: {
    load() {
      let url = "shop/list"
      let data = new FormData();
      let tokenx = this.$cookies.get("token");
      // console.log(tokenx);
      this.$store.commit("setmyToken", tokenx);
      let ttoken = this.$store.getters.myToken;
      // console.log(ttoken)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          "Authorization": tokenx,
        },
      };
      axios.get(url, config).then(res => {
        // console.log(res);
        let tmp = [];
        let price = 0;
        let sumall = 0;
        let Myreslist = res.data.data.shopVoList;
        let len = Myreslist.length;
        for (let i = 0; i < len; i++) {
          let ttmp = [];
          price = Myreslist[i].goodsVo.goods.price * Myreslist[i].shop.num;
          Myreslist[i].sum = price;
          sumall += price;
          tmp.push(Myreslist[i]);
        }
        this.sumAll = 0;
        this.resList = tmp;
        // console.log(tmp)
      }).catch(err => {
        // console.log(err);
        ElMessage.error("获取失败");
      })
    },
    gotoInFo(id) {
      // console.log(id);
      this.$router.push({
        path: '/GoodInfo',
        query: {
          item: JSON.stringify(id.goods),
          img: JSON.stringify(id.photos)
        }
      }
      )
    },
    gotoPay()
    {
      if(this.sumAll > 0) {
        this.$router.push({
          path: '/pay',
          query: {
            money: JSON.stringify(this.sumAll),
            select: JSON.stringify(this.multipleSelection),
            from: JSON.stringify(1)
          }
        });
      }
      else
      {
        ElMessage.error("请选择商品")
      }
    },
    deleteCart(id) {
      // console.log(id);
      // console.log(id.shop.id);
      // let data = {
      //   "id": id.shop.id
      // }
      let tokenx = this.$store.getters.myToken;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          "Authorization": tokenx,
        },
      };
      axios.delete("/shop/del", {
        params: {
          "id": id.shop.id
        }
      }, config).then(
        res => {
          // console.log(res);
          this.load()
          // alert("删除成功");
          ElMessage.success("删除成功");
        }
      ).catch(err => {
        // console.log(err);
        // alert("删除失败")
        ElMessage.error("删除失败");
      })

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log("val")
      // console.log(val);
      let sum = 0;
      for (let i = 0; i < val.length; i++) {
        sum += val[i].sum;
      }
      this.sumAll = sum;

    },
    handleChange(row) {
      // console.log(row);
      let price = 0;
      let sumall = 0;
      let tmp = [];
      let Myreslist = this.resList;
      let len = Myreslist.length;
      for (let i = 0; i < len; i++) {
        price = Myreslist[i].goodsVo.goods.price * Myreslist[i].shop.num;
        Myreslist[i].sum = price;
        tmp.push(Myreslist[i]);
      }
      this.resList = tmp;
      let url = "shop/modify";
      let data = new FormData();
      data.append("num", row.shop.num);
      // console.log( row.shop.num);
      data.append("shopId", row.shop.id);
      let tokenx = this.$store.getters.myToken;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data ",
          "Authorization": tokenx,
        },
      };
      axios.post(url, data, config).then(
        res=>{
          // console.log("okk");
          // console.log(res);
          // ElMessage.success("修改成功")
      }
      ).catch(
        err=>{
          // console.log(err);
        }
      )
    }
  }
}
</script>
  
<style scoped>

</style>
