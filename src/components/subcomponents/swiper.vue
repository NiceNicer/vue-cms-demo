<temnplate>
    <div>
        <mt-swipe :auto="4000">
            <!--父组件向子组件传lunbotuList-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">

                <img :src="item.img_url" alt="">
            </mt-swipe-item>


        </mt-swipe>

    </div>

</temnplate>

<script type="text/ecmascript-6">
    export default {
        props: ["lunbotuList"]
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
            img{
                width:100%;
                height: 100%;
            }
        }
    }

</style>