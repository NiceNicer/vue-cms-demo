<template>
    <div class="goods-list">
        <!--<router-link :to="'/home/goodsinfo' + item.id" class="goods-item" v-for="item in goodslist" :key="item.id">-->
            <!--<img :src="item.img_url" alt="">-->
            <!--<h1 class="title">{{item.title}}</h1>-->
            <!--<div class="info">-->
                <!--<p class="price">-->
                    <!--<span class="now">￥{{item.sell_price}}</span>-->
                    <!--<span class="old">￥{{item.market_price}}</span>-->
                <!--</p>-->
                <!--<p class="sell">-->
                    <!--<span>热卖中</span>-->
                    <!--<span>剩{{ item.stock_quantity }}件</span>-->
                <!--</p>-->

            <!--</div>-->
            <!---->
        <!--</router-link>-->





        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>

            </div>

        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            //data是往自己组件内部挂载一些私有数据的
            return{
                pageindex:1, //分页的页数
                goodslist:[] //存放商品列表的数组
            }
        },
        created(){
            this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                //获取商品列表
                this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result=>{
                    if(result.body.status === 0){
//                        this.goodslist = result.body.message
                        this.goodslist = this.goodslist.concat(result.body.message)
                    }

                })

            },
            getMore(){
                this.pageindex++
                this.getGoodsList()
            },
            goDetail(id){
                //使用 js 的形式进行路由导航(编程式导航)
                //this.$route 是路由参数对象，所有路由中的参数，params , query 都属于它
                // this.$router是路由导航对象，用它可以方便的使用 js代码，实现路由的前进、后退、跳转

                this.$router.push({ name: "goodsinfo", params: { id }})


            }
        }

    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped  >
    .goods-list{
        padding: 7px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item{
            padding: 2px;
            border: 1px solid #ccc;
            width: 49%;
            box-shadow: 0 0 4px #ccc;
            margin: 3px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;

            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-size: 16%;
                        font-weight: bold;

                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;

                    }

                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;

                }
            }
        }
    }

</style>