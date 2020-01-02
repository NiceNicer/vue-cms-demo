<!--遇到的问题1： 模板的点击方法@click必须放到<van-tabs>上，且自带的参数是<can-tab>的索引，需要根据索引获取当前分类id，再发起请求-->


<!--遇到的问题2：首次加载页面时，需要执行两个函数，方法一：获取全部分类数组，方法二：根据当前分类索引获取图片数组。
方法二需要用到方法一的数组结果，两个方法都放在created中，第一次执行时全部分类数组为空，所以讲方法二放在updated函数
中，这样又会在数据每次更新后方法二都调用，所以定义一个标记变量保证方法二只在数据第一次更新后执行

-->

<template>
    <div>

        <van-tabs v-model="active" @click="getPhotoListByIndex">
            <van-tab  :title=" item.title "  v-for="item in cates" :key="item.id" class="imgbox">

                <!--<button @click="getPhotoListByIndex(item.id)">测试</button>-->
                <!--图片区域-->

                <!--遇到问题： @click 方法在 van-tab标签上不能调用 ，必须放到 vam-tabs 标签上 -->
                <!--当前分类id：{{item.id}}-->
                <!--当前cateid：{{cateid}}-->
                <!--图片数：{{list.length}}-->

                <ul>
                    <router-link v-for="item in list" :key="item.id"  :to="'/home/photoinfo/' + item.id" tag="li">

                        <img v-lazy="item.img_url">
                        <div class="info">
                            <h1 class="info-title">{{ item.title }}</h1>
                            <div class="info-body">{{ item.zhaiyao }}</div>
                        </div>
                    </router-link>
                </ul>

            </van-tab>
        </van-tabs>


    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        data() {
            return {
                doneflag:true,  //定义一个标记变量
                active: 0,
                cates: [], //所有分类的列表数组
                list: [], //当前分类下所有图片
                cateid:0 //当前分类id
            };
        },created(){
            this.getAllCategory()


        },updated(){
            //必须要保证  getPhotoListByIndex() 方法第一次执行时 getAllCategory已经执行过一次
            this.doneOnce()


        },
        beforeDestroy(){
//            this.getPhotoListByIndex(0)

        },destroyed(){
//            this.getPhotoListByIndex(this.cateid)

        },

        methods: {
            getAllCategory(){
                //获取所有的图片分类
                this.$http.get('api/getimgcategory').then(result =>{
                    if(result.body.status ===0){
                        //手动拼接出一个最完整的分类列表
                        result.body.message.unshift({ title: '全部', id: 0 })
                        this.cates = result.body.message
                  }
                })
            },
            getPhotoListByIndex(index){
                console.log('当前分类索引===='+index)
                console.log('图片数组长度===='+this.cates.length)
                this.cateid = this.cates[index].id
                console.log('当前分类的id===='+this.cateid)

                this.$http.get('api/getimages/' + this.cateid).then(result =>{
                    if(result.body.status === 0){
                        console.log('点击方法调用了索引'+index)
                        this.list = result.body.message
                    }
                })

            },
            doneOnce(){
                //页面加载后只调用一次
                if(!this.doneflag){
                    return
                }else{
                    this.getPhotoListByIndex(0)
                    this.doneflag = false
                }
            }

        }
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .imgbox{
        margin: 0;
        padding: 10px;
        padding-bottom: 0;

        ul li{
            text-align: center;
            margin-bottom: 10px;
            box-shadow:0 0 9px #999;
            position:relative;

            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            img{
                width: 100%;
                vertical-align: middle;

            }

            .info{
                color: white;
                text-align:left;
                position:absolute;
                bottom:0;
                max-height: 84px;
                background-color: rgba(0,0,0,0.4);
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                }

            }
        }



    }









</style>