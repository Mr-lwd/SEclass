<template>
    <el-table :data="list">
        <el-table-column prop="goodsVo.goods.id" label="商品ID" align="center">
        </el-table-column>
        <el-table-column prop="goodsVo.goods.name" label="商品名称" align="center">
        </el-table-column>
        <el-table-column prop="orders.totalPrice" label="价格" align="center">
        </el-table-column>
        <el-table-column prop="orders.exNum" label="快递单号" align="center">
        </el-table-column>
        <el-table-column prop="orders.gmtDeliver" label="发货时间" align="center">
        </el-table-column>
        <el-table-column prop="orders.gmtReceive" label="收货时间" align="center">
        </el-table-column>
        <el-table-column prop="orders.state" label="状态" align="center">
            <template #default="scope">
                <el-select v-model="scope.row.orders.state" disabled placeholder="Select">
                    <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button style="width: 6vmin;" type="default" @click.prevent="handleEdit(scope.row)">修改</el-button>
                <el-button style="width: 6vmin" type="danger" @click.prevent="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>


</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    data() {
        return {
            list: [],
            goodList: [],
            orderList: [],
            dialogFormVisible: false,
            form: {

            },
            states: [
                {
                    value: 1,
                    label: '配送中',
                }
            ]
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        isNull(value) {
            if (value) {
                return value
            }
            return '暂无'
        },
        load() {
            let tokenx = this.$cookies.get("token");
            console.log(tokenx)
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data ",
                    "Authorization": tokenx,
                },
            };
            this.axios.get("/orders/list", config).then(res => {
                console.log(res.data.data.orderList);
                this.list = res.data.data.orderList
                console.log(this.list)
                // this.orderList = res.data.data.orderList.map(item=>{return item.orders})            
                // this.goodList = res.data.data.orderList.map(item=>{return item.goodsVo}).map(item=>{return item.goods})            
                // this.list.push(this.goodList);
                // console.log(this.list)
                // this.list.push(this.orderList);
                // console.log(this.list)
            }).catch(err => {
                console.log(err);
            })
        },
        handleEdit(order) {
            this.dialogFormVisible = true
            this.form = JSON.parse(JSON.stringify(order))
            console.log(order)
        },
        save() {

            // let tokenx = this.$cookies.get("token");
            // console.log(tokenx)
            // let config = {
            //     headers: {
            //         "Content-Type": "multipart/form-data ",
            //         "Authorization": tokenx,
            //     },
            // };
            // this.axios.post("/goods/modify", this.form, config).then(res => {
            //     this.dialogFormVisible = false;
            //     ElMessage.success("修改成功")
            //     console.log(res);
            //     this.load()
            // }).catch(err => {
            //     ElMessage.info("取消修改")
            //     console.log(err);
            // })
            // console.log(this.form);
        },
        handleDelete(deleteid) {

            // ElMessageBox.confirm(
            //     '删除后无法恢复',
            //     '警告',
            //     {
            //         confirmButtonText: '确认',
            //         cancelButtonText: '取消',
            //         type: 'warning',
            //     }
            // ).then(() => {
            //     let tokenx = this.$cookies.get("token");
            //     console.log(tokenx)
            //     let config = {
            //         headers: {
            //             "Content-Type": "multipart/form-data ",
            //             "Authorization": tokenx,
            //         },
            //     };
            //     this.axios.delete("/goods/del", {
            //         params: {
            //             "id": deleteid
            //         }
            //     }, config).then(res => {
            //         ElMessage.success("删除成功")
            //         console.log(res);
            //         this.load()
            //     }).catch(err => {
            //         console.log(err);
            //     })
            // })
        }
    }
}
</script>
<style>

</style>