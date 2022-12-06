<template>
    <el-table :data="goodList">
        <!-- <el-table-column type="selection" width="40px"/> -->
        <el-table-column prop="id" label="商品编号(goodID)" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="price" label="价格" align="center">
        </el-table-column>
        <el-table-column prop="sale" label="销量" align="center">
        </el-table-column>
        <el-table-column prop="store" label="库存" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button style="width: 8vmin;" type="default" @click.prevent="handleEdit(scope.row)">修改</el-button>
                <el-button style="width: 8vmin" type="danger" @click.prevent="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="用户信息" v-model="dialogFormVisible" style="max-width: 60vmin;">
        <template #default>
            <el-form label-width="10vmin" style="margin: 3vmin;" label-position="right" size="default">
                <el-form-item label="名称">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="销量">
                    <el-input v-model="form.sale" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="form.store" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="详情">
                    <el-input type="textarea" v-model="form.detail" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </template>
    </el-dialog>
</template>




<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    data() {
        return {
            goodList: [],
            dialogFormVisible: false,
            form: {

            }
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            let tokenx = this.$cookies.get("token");
            console.log(tokenx)
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data ",
                    "Authorization": tokenx,
                },
            };
            this.axios.get("/goods/listByUserId", config).then(res => {
                console.log(res.data.data.goodsList);
                let newArrVal = JSON.parse(JSON.stringify(res.data.data.goodsList))
                newArrVal = newArrVal.map(e => { return e.goods }) //然后删除属性id
                this.goodList = newArrVal
                console.log(newArrVal);
            }).catch(err => {
                console.log(err);
            })
        },
        handleEdit(good) {
            this.dialogFormVisible = true
            this.form = JSON.parse(JSON.stringify(good))
            console.log(good)
        },
        save() {
            let tokenx = this.$cookies.get("token");
            console.log(tokenx)
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data ",
                    "Authorization": tokenx,
                },
            };
            this.axios.post("/goods/modify", this.form, config).then(res => {
                this.dialogFormVisible = false;
                ElMessage.success("修改成功")
                console.log(res);
                this.load()
            }).catch(err => {
                ElMessage.info("取消修改")
                console.log(err);
            })
            console.log(this.form);
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
                this.axios.delete("/goods/del", {
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