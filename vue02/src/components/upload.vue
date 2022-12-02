<template>
    <div style="padding-top:5vmin;margin: 0 auto;width: 800px;">
        <div style="margin-bottom: 5vmin;text-align: center;">
            <el-upload :on-preview="preview" :on-remove="handleRemove" :on-change="changeFile"
                :before-upload="beforeUpload" :file-list="fileList" :http-request="upload" list-type="picture-card"
                action="#" limit="4" :class="{ disabled: fileComputed }">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <!-- 进度条 -->
            <el-progress v-if="showPercent" style="width: 180px;margin-left: 40vmin;" :percentage="percent" />
            <!-- 放置一个弹层 -->
            <!-- sync修饰符自动将弹层关闭了 -->
        </div>
        <el-dialog v-model="showDialog">
            <img :src="imgUrl" style="width:100%" alt="">
        </el-dialog>

        <div>
            <el-form label-width="120px" style="width: 70%;margin: 0 auto;">
                <el-form-item label="商品名称">
                    <el-col :span="18">
                        <el-input v-model="good.name" />
                    </el-col>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input-number v-model="good.price" :precision="2" :step="20" :min="0" :max="999999" />
                </el-form-item>
                <el-form-item label="销量">
                    <el-col :span="12">
                        <el-input-number v-model="good.sale" :step="10" :min="0" :max="9999" />
                    </el-col>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input-number v-model="good.store" :step="10" :min="1" :max="9999" />
                </el-form-item>
                <el-form-item style="width: 60vmin;" label="详细描述">
                    <el-input v-model="good.detail" type="textarea" autosize />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addGood">发布</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
const COS = require('cos-js-sdk-v5');

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
let cos = new COS({
    SecretId: 'AKIDegYJsDON8h2CC4qSSEl4D8mAH8iRzQbV',
    SecretKey: 'iNr6B6mCNIJ7g5ShjaJvPjtupeIjvsiP'
})
export default {
    data() {
        return {
            good: {
                name: '',
                price: 0,
                detail: '',
                store: 0,
                sale: 0,
            },
            fileList: [],
            showDialog: false, // 控制图片的显示或者隐藏
            imgUrl: '', // 存储点击的图片地址
            currentFileUid: '', // 用一个变量 记住当前上传的图片id
            percent: 0,
            showPercent: false, // 默认不显示进度条
            tokenx: '',
        };
    },
    mounted() {
        let tokenx = this.$cookies.get("token");
        this.$store.commit("setmyToken", tokenx);
        let ttoken = this.$store.getters.myToken;
        console.log(ttoken)
    },
    computed: {
        // 设定一个计算属性 判断是否已经上传完了一张
        fileComputed() {
            return this.fileList.length >= 3
        }
    },
    methods: {
        // upload(file) {
        //   console.log(file)
        // },
        // handleAvatarSuccess(res, file) {
        //   this.imageUrl = URL.createObjectURL(file.raw)
        // },
        // 自定义上传函数
        // http-request属性的回调函数有一个默认的参数,content 是一个对象,这个形参不用传实参
        upload(params) {
            if (params.file) {
                //  上传文件到腾讯云
                cos.putObject({
                    // 配置
                    Bucket: 'dbimgs-1311173769', /* 必须:存储桶 */
                    Region: 'ap-chengdu', /* 存储桶所在地域，必须字段 */
                    Key: params.file.name, /* 必须 :文件名 */
                    StorageClass: 'STANDARD', // 上传模式
                    Body: params.file, // 上传文件对象
                    // 进度条
                    onProgress: (params) => {
                        this.percent = params.percent * 100
                    }
                }, (err, data) => {
                    // 需要判断错误与成功
                    if (!err && data.statusCode === 200) {
                        console.log(err || data);
                        // 如果没有失败表示成功了
                        // 此时认为上传成功了
                        // this.currentFileUid
                        // 仍然有个小问题， 比如此时我们正在上传，但是调用了保存，保存在上传过程中进行，
                        // 此时上传还没有完成  此时可以这样做 ： 给所有上传成功的图片 加一个属性 upload: true
                        this.fileList = this.fileList.map(item => {
                            if (item.uid === this.currentFileUid) {
                                //   upload为true表示 该图片已经成功上传到服务器，地址已经是腾讯云的地址了  就不可以执行保存了
                                return { url: 'http://' + data.Location, upload: true } // 将本地的地址换成腾讯云地址
                            }
                            return item
                        })
                        console.log(this.fileList);
                        setTimeout(() => {
                            this.showPercent = false // 隐藏进度条
                            this.percent = 0 // 进度归0
                        }, 2000)

                        // 将腾讯云地址写入到fileList上 ，保存的时候 就可以从fileList中直接获取图片地址

                        // 此时注意，我们应该记住 当前上传的是哪个图片  上传成功之后，将图片的地址赋值回去
                    }
                })
            }
        },
        handleRemove(file) {
            // file是点击删除的文件
            //   将原来的文件给排除掉了 剩下的就是最新的数组了
            this.fileList = this.fileList.filter(item => item.uid !== file.uid)
            // console.log(this.fileList);
        },
        preview(file) {
            // 这里应该弹出一个层 层里是点击的图片地址
            this.imgUrl = file.url
            this.showDialog = true
        },
        // 修改文件时触发
        // 此时可以用fileList 因为该方法会进来很多遍 不能每次都去push
        // fileList因为fileList参数是当前传进来的最新参数 我们只需要将其转化成数组即可 需要转化成一个新的数组
        // [] => [...fileList] [] => fileList.map()
        // 上传成功之后 还会进来 需要实现上传代码的逻辑 这里才会成功
        changeFile(file, fileList) {
            this.fileList = fileList.map(item => item)
            console.log(this.fileList);
        },
        beforeUpload(file) {
            // 要开始做文件上传的检查了
            // 文件类型 文件大小
            const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
            if (!types.includes(file.type)) {
                this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
                return false
            }
            //  检查大小
            const maxSize = 5 * 1024 * 1024
            if (maxSize < file.size) {
                this.$message.error('图片大小最大不能超过5M')
                return false
            }
            // file.uid
            this.currentFileUid = file.uid // 记住当前的uid
            this.showPercent = true
            return true
        },
        addGood() {
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data ",
                    "Authorization": this.tokenx,
                },
            };
            this.axios.post('/goods/add', this.good, config).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style>
.disabled .el-upload--picture-card {
    display: none
}
</style>