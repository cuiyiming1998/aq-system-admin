<template>
    <div class="answer-info">
        <h1>答案统计信息</h1>
        <div class="search">
            <el-input v-model="projectId" placeholder="请输入问卷的id进行查找" @keydown.enter.native="searchAnswer"/>
            <el-button @click="searchAnswer">搜索</el-button>
        </div>
        <div v-if="answerData.length > 0">
            <el-card shadow="hover" class="card" v-for="(item,index) in questInfo">
                <div slot="header">
                    <h3><span>{{index+1}}.</span>{{ item.title }}</h3>
                </div>
                <div v-if="item.type != 'text' ">
                    <div v-for="(i,k) in answerData[index]" :key="k" class="count-line">
                        <span>{{i.answer}}：</span>
                        <span><span class="count">{{i.count}}</span>人</span>
                    </div>
                </div>
                <div v-else>
                    <span  v-for="(i,k) in answerData[index]" :key=k>
                        <el-tag  v-if="i.answer != '' " class="tags">
                            {{i.answer}}
                        </el-tag>
                    </span>
                </div>
            </el-card>
        </div>
        <div v-else class="tip">
            <h2>请输入问卷的id</h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            projectId: '',
            answerData: [],
            questInfo: [],
        }
    },
    methods:{
        searchAnswer(){
            let self = this;
            axios({
                method: 'get',
                url: '/getAnswer',
                params:{
                    projectId: self.projectId
                }
            }).then((res)=>{
                if(res.data.code == 1){
                    let answer = res.data.answer;
                    // 解析答案信息
                    for(let i=0;i<answer.length;i++){
                        for(let j=0;j<answer[i].length;j++){
                            answer[i][j].answer = JSON.parse(answer[i][j].answer);
                            if(typeof(answer[i][j].answer) === "object"){
                                // 将数组变成字符串
                                answer[i][j].answer = answer[i][j].answer.join('+');
                            };
                        }
                    }
                    self.answerData = res.data.answer;
                    self.questInfo = res.data.questInfo;
                }else if(res.data.code == 2){
                    self.$message({
                        message: '没有查询到此id对应的问卷，请检查id是否正确',
                        type: 'error'
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.answer-info{
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
    overflow: scroll;
    h1{
        text-align: center;
    }
    .search{
        width: 50%;
        display: flex;
        margin: 20px auto;
    }
    .tip{
        height: 70%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ccc;
    }
    .card{
        margin: 20px auto;
    }
    .count-line{
        padding: 5px 20px;
    }
    .count{
        font-weight: bold;
        font-size: 2em;
    }
    .tags{
            margin: 10px 5px;
            cursor: default;
            transition: all .2s;
        }
    .tags:hover{
        background-color: #409eff;
        color: #fff;
    }
}
</style>

