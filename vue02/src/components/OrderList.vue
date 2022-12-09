<template>
    <el-table :data="list">
        <el-table-column prop="orders.id" label="订单ID" align="center">
        </el-table-column>
        <el-table-column prop="goodsVo.goods.id" label="商品ID" align="center">
        </el-table-column>
        <!-- <el-table-column prop="goodsVo.goods.name" label="商品名称" align="center">
        </el-table-column> -->
        <el-table-column prop="orders.num" label="数量" align="center">
        </el-table-column>
        <el-table-column prop="orders.exNum" label="快递单号" align="center">
        </el-table-column>
        <el-table-column prop="orders.gmtDeliver" label="发货时间" align="center">
        </el-table-column>
        <!-- <el-table-column prop="orders.gmtReceive" label="收货时间" align="center">
        </el-table-column> -->
        <el-table-column prop="orders.state" label="状态" align="center">
            <template #default="scope">
                <el-select v-model="scope.row.orders.state" disabled placeholder="Select">
                    <el-option v-for="item in states" :disabled="item.disabled" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button style="width: 6vmin;" type="default" @click.prevent="handleEdit(scope.row)"
                    v-if="scope.row.orders.state <= 1">发货</el-button>
                <el-button style="width: 6vmin" type="warning"
                    @click.prevent="handleGoodback(scope.row)" v-if="scope.row.orders.state == 3">确认退货</el-button>
                <el-button style="width: 6vmin" type="danger" v-if="scope.row.orders.state >= 4"
                    @click.prevent="handleDelete(scope.row.orders.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="物流信息" v-model="dialogFormVisible" style="max-width: 60vmin;">
        <template #default>
            <el-form label-width="10vmin" style="margin: 3vmin;" label-position="right" size="default">
                <el-form-item label="订单ID">
                    <el-input disabled v-model="form.orders.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品ID">
                    <el-input disabled v-model="form.goodsVo.goods.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input disabled v-model="form.goodsVo.goods.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input disabled v-model="form.orders.num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="总价格">
                    <el-input disabled v-model="form.orders.totalPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="快递单号">
                    <el-input v-model="form.orders.exNum" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="发货时间">
                    <el-date-picker v-model="form.orders.gmtDeliver" type="datetime" placeholder="暂无"
                        format="YYYY/MM/DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
                </el-form-item>
                <el-form-item label="收货时间">
                    <el-date-picker disabled v-model="form.orders.gmtReceive" type="datetime" placeholder="暂无"/>
                </el-form-item> -->
                <!-- <el-form-item label="状态">
                    <el-select v-model="form.orders.state" placeholder="Select">
                        <el-option v-for="item in states" :disabled="item.disabled" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item> -->
            </el-form>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="deliver">确 定</el-button>
            </div>
        </template>
    </el-dialog>
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
            postForm: {
            },
            states: [
                {
                    value: 1,
                    label: '待发货',
                },
                {
                    value: 2,
                    label: '配送中',
                },
                {
                    value: 5,
                    label: '退货完成',
                },
                {
                    value: 0,
                    label: '未支付',
                    disabled: true,
                },
                {
                    value: 3,
                    label: '退货中',
                    disabled: true,
                },
                {
                    value: 4,
                    label: '收货成功',
                    disabled: true,
                },

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
            }).catch(err => {
                console.log(err);
            })
        },
        handleEdit(order) {
            this.dialogFormVisible = true
            this.form = JSON.parse(JSON.stringify(order))
            console.log(order)
        },
        deliver() {
            let tokenx = this.$cookies.get("token");
            console.log(tokenx)
            this.postForm = this.form.orders
            console.log(this.postForm)
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data ",
                    "Authorization": tokenx,
                },
                params: {
                    "exNum": this.postForm.exNum,
                    "id": this.postForm.id
                }
            };
            this.axios.get("/orders/ex", config).then(res => {
                this.dialogFormVisible = false;
                ElMessage.success("发货成功")
                console.log(res);
                this.load()
            }).catch(err => {
                ElMessage.info("取消修改")
                console.log(err);
            })
        },
        handleGoodback(order){
            ElMessageBox.confirm(
                '确认已收到退还货物吗？',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                let tokenx = this.$cookies.get("token");
                console.log(tokenx)
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data ",
                        "Authorization": tokenx,
                    },
                    params: {
                        "exNum": order.orders.exNum,
                        "id": order.orders.id
                    }
                };
                this.axios.get("/orders/over", config).then(res => {
                    this.dialogFormVisible = false;
                    ElMessage.success("确认退货结束")
                    console.log(res);
                    this.load()
                }).catch(err => {
                    ElMessage.warning("请求失败")
                    console.log(err);
                })
            })
        },
        handleDelete(deleteid) {
            ElMessageBox.confirm(
                '删除后无法恢复',
                '警告',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                let tokenx = this.$cookies.get("token");
                console.log(tokenx)
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data ",
                        "Authorization": tokenx,
                    },
                };
                this.axios.delete("/orders/del", {
                    params: {
                        "id": deleteid
                    }
                }, config).then(res => {
                    ElMessage.success("删除成功")
                    console.log(res);
                    this.load()
                }).catch(err => {
                    console.log(err);
                })
            })
        }
    }
}
</script>
<style>

</style>