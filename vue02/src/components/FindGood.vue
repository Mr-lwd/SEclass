<template>
    <div style="width: 100vmin;margin-left:10vmin;margin-top: 5vmin;margin-bottom: 5vmin;">
        <form class="d-flex" role="search" v-on:submit.prevent>
            <input class="form-control me-2" type="search" v-model="strLike" placeholder="输入商品名称" aria-label="Search" />
            <button class="btn btn-outline-success" @click="load" style="background-color: #ff6600">
                <i class="bi bi-search"></i>
            </button>
            <el-button style="margin-left: 3vmin;" type="info"
                @click="getOrder = 4; strLike = ''; load()">重置</el-button>
            <el-select style="margin-left: 3vmin;" v-model="orders.value" placeholder="请选择" @change="orderChange()">
                <el-option v-for="item in orders" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </form>
    </div>
    <div style="width: 95%;margin: 0 auto;">
        <div class="list-box" v-if="goodList">
            <div class="list" v-for="(arr, i) in goodList" v-bind:key="i">
                <div style="border: 2px solid #ff6600;overflow: hidden;" class="item" v-for="(item, j) in arr" v-bind:key="j">
                    <div class="item-img" v-if="item.photos[0]">
                        <img :src="item.photos[0].url" alt="" />
                    </div>
                    <div class="item-img" v-if="!item.photos[0]">
                        <img src="../assets/logo.png" alt="" />
                    </div>
                    <div class="item-info">
                        <h3>{{ item.goods.name }}</h3>
                        <p class="price" @click="addCart(item.goods.id)">
                            {{ item.goods.price }}元
                        </p>
                        <div><el-icon @click="goToCart(item)" style="font-size: 28px;">
                                <ShoppingCart />
                            </el-icon></div>
                        <!-- <p>{{ item.goods.detail }}</p> -->

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
    data() {
        return {
            strLike: '',
            goodList: [],
            orders: [
                {
                    value: 1,//1
                    label: "价格升序"
                },
                {
                    value: 2,//2
                    label: "价格降序"
                },
                {
                    value: 3,//3
                    label: "销量升序"
                },
                {
                    value: 4,//4
                    label: "销量降序"
                },
                {
                    value: 5,//5
                    label: "库存升序"
                },
                {
                    value: 6,//6
                    label: "库存降序"
                },
            ],
            getOrder: 4,
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        orderChange() {
            this.getOrder = this.orders.value;
            this.load()
        },
        load() {
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data ",
                },
                params: {
                    "keyword": this.strLike,
                    "pageNum": 1,
                    "pageSize": 50,
                    "order": this.getOrder,
                }
            };
            this.axios.get("/goods/search", config).then(res => {
                // console.log(res)
                this.goodList = [
                    res.data.data.result.slice(0, 5),
                    res.data.data.result.slice(5, 10),
                ];
            }).catch(err => {
                // console.log(err)
                ElMessage.error("查询失败")
            })
        },
        goToCart(item) {
            this.$router.push({
                path: '/GoodInfo',
                query: {
                    item: JSON.stringify(item.goods),
                    img: JSON.stringify(item.photos)
                }
            }
            )
        },
    }
}
</script>
<style lang="scss" scoped>
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";

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

.list-box {
    .list {
        @include flex();
        width: 100%;
        margin-bottom: 14px;

        &:last-child {
            margin-bottom: 0;
        }

        .item {
            width: 17%;
            height: 360px;
            background-color: $colorG;
            text-align: center;

            span {
                display: inline-block;
                width: 67px;
                height: 28px;
                font-size: 28px;
                line-height: 28px;
                color: $colorG;

                &.new-pro {
                    background-color: #7ecf68;
                }

                &.kill-pro {
                    background-color: #e82626;
                }
            }

            .item-img {
                img {
                    width: 100%;
                    height: 195px;
                }
            }

            .item-info {
                h3 {
                    font-size: 20px;
                    color: $colorB;
                    line-height: 20px;
                    font-weight: bold;
                }

                p {
                    color: $colorD;
                    line-height: 26px;
                    margin: 6px auto 13px;
                    font-size: 16px;
                }

                .price {
                    color: #f20a0a;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
