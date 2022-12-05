<template>
    {{ this.goodList }}
</template>




<script>
export default {
    data() {
        return {
            strLike: '',
            goodList: '',
        }
    },
    mounted() { 
        // this.strLike = this.$route.query.findStr;
        console.log(this.$route)
        this.axios.get("/goods/search", {
            keyword: this.strLike,
            pageNum:1,
            pageSize:50,
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    },

}
</script>
<style>
.infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>