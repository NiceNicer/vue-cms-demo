<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <!--组件中使用v-for循环，一定要使用key，key必须唯一-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">

                <img v-bind:src="item.img_url" alt="">
            </mt-swipe-item>


        </mt-swipe>

        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>

        </ul>
    </div>
</template>
<script>
    //弹窗
    import { Toast } from 'mint-ui'
    export default{
        data(){
            return{
                lunbotuList: []//默认保存轮播图的数组
            }
        },
        created(){
            this.getLunbotu();

        },
        methods: {
            getLunbotu(){
                this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then(result =>{
                    console.log(result.body)
                    if(result.body.status ===0){
                    this.lunbotuList = result.body.message;
                    }else{
                    //失败的
                    Toast("加载轮播图失败")
                    }
                });
            }

        }
    }

</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;

        .mint-swipe-item{
            &:nth-child(1){
                 background-color: red;
             }
            &:nth-child(2){
                 background-color: blue;
             }
            &:nth-child(3){
                 background-color: yellow;
             }
        }
    }
    img{
        width:100%;
        height: 100%;
    }
    .mui-grid-view.mui-grid-9{
        border:none;
        background-color: #fff;
        img{
            width: 60px;
            height: 60px;
        }

    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
    }



</style>