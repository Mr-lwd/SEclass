<template>
    <el-menu :default-active="activeIndex" active-text-color="#ffd04b" background-color="#545c64"
        class="el-menu-vertical-demo" text-color="#fff" :collapse="isCollapse" @open="handleOpen" @close="handleClose"
        style="margin-left: 20px;" router>
        <el-menu-item index="/manage/addgood">
            <el-icon><Sell /></el-icon>
            <span>添加商品</span>
        </el-menu-item>
        <el-menu-item index="/manage/addgood">
            <el-icon><List /></el-icon>
            <span>商品管理</span>
        </el-menu-item>
        <el-menu-item index="/manage/addgood">
            <el-icon><Van /></el-icon>
            <span>订单管理</span>
        </el-menu-item>
        <el-button style="background-color: #545c64;border-color: #545c64;width: 100%;color:white;"
            @click="isCollapse = !isCollapse">
            <el-icon v-show="!isCollapse">
                <ArrowLeftBold />
            </el-icon>
            <span v-show="!isCollapse">收缩</span>
            <el-icon v-show="isCollapse">
                <ArrowRightBold />
            </el-icon>
        </el-button>
    </el-menu>
</template>
    
<script>
import { ref } from 'vue'

export default {
    name:'asideMenu',
    data(){
        return{
            isCollapse : ref(false)
        }
    },
    computed(){
    }
}

</script>
<style>

</style>