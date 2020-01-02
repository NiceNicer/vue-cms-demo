<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!--商品列表区域-->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id] " :goodsid="item.id"></numbox>
                                <br>
                                <!--<a href="#" @click="remove(item.id, i)">删除</a>-->
                                <button @click="remove(item.id,i)">删除</button>
                                <!--<a href="javascript:;" @click="test">测试</a>-->
                            </p>

                        </div>


                    </div>
                </div>
            </div>
        </div>
        <!--结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总结 <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>

            </div>

        </div>
        <p>{{$store.getters.getGoodsSelected}}</p>

    </div>

</template>
<script type="text/ecmascript-6">

    import numbox from '../subcomponents/shopcar_numbox.vue'
    export default{
        data(){
            return {
                goodslist:[] //购物车中所有商品的数据
            }

        },created(){
            this.getGoodsList()

        },
        methods:{
            getGoodsList(){
                //1.获取到store中所有商品的id拼接出一个用逗号分隔的字符串
                var idArr = []
                this.$store.state.car.forEach(item=>idArr.push(item.id))
                if(idArr.length<=0){
                    return
                }
                console.log(idArr)
                //获取购物车商品列表
                this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
                    if(result.body.status === 0){
                        this.goodslist = result.body.message

                    }
                })

            },
            remove(id,index){
                //点击删除，把商品从 store中根据传递的id 删除，同时，把当前组建中的 goodslist中对应删除的商品利用index删除
                this.goodslist.splice(index,1)
                this.$store.commit('removeFormCar',id)
                console.log(1)

            },
            selectedChanged(id,val){
                //每当点击开关，把最新的开关状态同步到 store中
//                console.log(id+'+'+val)
                this.$store.commit('updateGoodsSelected',{id, selected: val})
            }
        },
        components:{
            numbox

        }
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /*html{*/
        /*touch-action: none;*/
    /*}*/

    .shopcar-container{
        background-color: #eee;

        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-items: center;
            }
            img{
                width: 60px;
                height: 60px;

            }
            h1{
                font-size: 14px;

            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .price{
                    color:red;

                }
            }
            button{
                border: none;
                color: red;
            }

        }
        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: red;
                font-weight: bold;
            }

        }


    }

</style>