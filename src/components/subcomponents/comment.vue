<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea name="" id=""  placeholder="请输入评论内容（最多120字）"v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list" v-for="(item, i) in comments" :key="item.add_time">
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，什么也没留下' : item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

    </div>

</template>

<script type="text/ecmascript-6">
    import { Toast } from "mint-ui"
    export default{
        data(){
            return{
                pageIndex: 1,
                comments:[], //所有的评论数据
                msg:''

            }

        },
        created(){
            this.getComments()

        },
        methods: {
            getComments(){//获取评论
                this.$http.get("api/getcomments/" + this.id +"?pageindex=" + this.pageIndex)
                        .then(result => {
                            if(result.body.status === 0){
//                                this.comments = result.body.message
                    //防止新数据覆盖老数据
                                this.comments =  this.comments.concat(result.body.message)

                            }else{
                              Toast('获取评论失败！')
                            }
                        })
            },
            getMore(){//加载更多
                this.pageIndex ++
                this.getComments()


            },
            postComment(){
                //校验是否为空
                if(this.msg.trim().length === 0){
                    return Toast("评论内容不能为空！")
                }


                //发表评论
                this.$http.post('api/postcomment/'+this.$route.params.id,{
                    content:this.msg.trim()
                }).then(function (result) {
                    if(result.body.status === 0){
                        var cmt = {
                            user_name:'匿名用户',
                            add_time: Date.now(),
                            content: this.msg.trim()
                        }
                        this.comments.unshift(cmt)
                        this.msg = ""
                    }

                })


            }

        },
        props: ["id"]

    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    background-color: #ccc;
                    line-height: 30px;

                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;

                }

            }

        }

    }

</style>