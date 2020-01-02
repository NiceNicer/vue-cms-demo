<template>
    <div>
        <cmtbox :id="$route.params.id"></cmtbox>

    </div>
</template>

<script type="text/ecmascript-6">
    import cmtbox from '../subcomponents/comment.vue'

    export default{
        components:{
            cmtbox
        }

    }


</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>