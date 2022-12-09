<template>
    <el-table :data="list">
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
                    <el-option v-for="item in states" :disabled="item.disabled" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button style="width: 6vmin;" type="default" @click.prevent="checkDetail(scope.row)">详情</el-button>
                <el-button style="width: 6vmin;" type="success" v-if="scope.row.orders.state == 2"
                    @click.prevent="handleReceive(scope.row)">收货</el-button>
                <el-button style="width: 6vmin;" type="danger" v-if="scope.row.orders.state != 3 && scope.row.orders.state != 5"
                    @click.prevent="handleReturn(scope.row)">退货</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="详细信息" v-model="dialogFormVisible" style="max-width: 60vmin;">
        <template #default>
            <el-form label-width="10vmin" style="margin: 3vmin;" label-position="right" size="default">
                <el-form-item label="商品名称">
                    <el-input disabled v-model="form.goodsVo.goods.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input disabled v-model="form.orders.num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input disabled v-model="form.orders.totalPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="快递单号">
                    <el-input disabled v-model="form.orders.exNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="发货时间">
                    <el-date-picker disabled v-model="form.orders.gmtDeliver" type="datetime" placeholder="暂未发货" />
                </el-form-item>
                <el-form-item label="收货时间">
                    <el-date-picker disabled v-model="form.orders.gmtReceive" type="datetime" placeholder="暂未收货" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select disabled v-model="form.orders.state" placeholder="Select">
                        <el-option v-for="item in states" :disabled="item.disabled" :key="item.value"
                            :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>
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
        checkDetail(order) {
            this.dialogFormVisible = true
            this.form = JSON.parse(JSON.stringify(order))
            console.log(order)
        },
        handleReceive(order) {
            ElMessageBox.confirm(
                '确认收货吗？',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'success',
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
                this.axios.get("/orders/receive", config).then(res => {
                    this.dialogFormVisible = false;
                    ElMessage.success("确认收货")
                    console.log(res);
                    this.load()
                }).catch(err => {
                    ElMessage.danger("请求失败")
                    console.log(err);
                })
            })
        },
        handleReturn(order) {
            ElMessageBox.confirm(
                '确认退货吗？',
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
                this.axios.get("/orders/return", config).then(res => {
                    this.dialogFormVisible = false;
                    ElMessage.success("确认退货")
                    console.log(res);
                    this.load()
                }).catch(err => {
                    ElMessage.warning("请求失败")
                    console.log(err);
                })
            })
        },
        // save() {
        //     let tokenx = this.$cookies.get("token");
        //     console.log(tokenx)
        //     let config = {
        //         headers: {
        //             "Content-Type": "multipart/form-data ",
        //             "Authorization": tokenx,
        //         },
        //     };
        //     this.postForm = this.form.orders
        //     console.log(this.postForm)
        //     this.axios.post("/orders/modify", this.postForm, config).then(res => {
        //         this.dialogFormVisible = false;
        //         ElMessage.success("修改成功")
        //         console.log(res);
        //         this.load()
        //     }).catch(err => {
        //         ElMessage.info("取消修改")
        //         console.log(err);
        //     })
        // },
    }
}
</script>
<style>

</style>