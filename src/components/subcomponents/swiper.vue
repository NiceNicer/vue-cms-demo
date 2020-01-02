<template>
    <div>
        <mt-swipe :auto="4000">
            <!--父组件向子组件传lunbotuList-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">

                <img :src="item.img_url" alt="" :class="{full: isfull}">
            </mt-swipe-item>
        </mt-swipe>

    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        props: ["lunbotuList","isfull"]
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .mint-swipe{
        height: 200px;

        .mint-swipe-item{
            text-align: center;


            img{
                /*width:100%;*/
                height: 100%;
            }
        }
    }
    .full{
        width: 100%;
    }

</style>