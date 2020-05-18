<template>
    <div class="user-info">
        <h1>问卷信息</h1>
        <el-table
            :data="projects .filter(data => !search || data.projectName.toLowerCase().includes(search.toLowerCase()))"
            height="500"
            @cell-click="detailInfo($event)"
            >
            <el-table-column
                label="id">
                <template slot-scope="scope">
                    <span>{{ scope.row.projectId }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="projectName"
                label="问卷名">
            </el-table-column>
            <el-table-column
                prop="username"
                label="发起用户">
            </el-table-column>
            <el-table-column
                prop="time"
                label="发布时间">
            </el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="按问卷名查找"/>
                </template>
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click.stop="deleteProj(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h1>详细信息</h1>
        <el-table
            :data="questions"
            height="200"
        >
            <el-table-column
                prop="title"
                label="问题">
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型">
            </el-table-column>
            <el-table-column
                prop="answers"
                label="选项">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            projects: [],
            questions: [],
            search: ''
        }
    },
    methods:{
        // 获取问卷列表
        getProjInfo(){
            let self = this;
            axios({
                method: 'get',
                url: '/ProjInfo'
            }).then((res)=>{
                if(res.data.code == 1){
                    self.projects = res.data.projInfo
                }
            })
        },
        // 获取选中问卷的问题列表
        detailInfo(value){
            let self = this;
            axios({
                method: 'get',
                url: '/getQuestions',
                params:{
                    id: value.projectId
                }
            }).then((res)=>{
                if(res.data.code == 1){
                    self.questions = res.data.questions;
                    for(let i=0;i<self.questions.length;i++){
                        if(self.questions[i].type == 'radio'){
                            self.questions[i].type = '单选';
                            self.questions[i].answers =self.questions[i].answers.join("，")
                        }else if(self.questions[i].type == 'checkbox'){
                            self.questions[i].type = '多选'
                            self.questions[i].answers =self.questions[i].answers.join("，")
                        }else if(self.questions[i].type == 'text'){
                            self.questions[i].type = '文字'
                        }
                    }
                }
            })
        },
        deleteProj(value){
            let self = this;
            this.$confirm('此操作将永久删除此问卷，是否继续？','提示',{
                confirmButonText: '删除',
                cancelButtonText: '取消',
            }).then(()=>{
                axios({
                    method: 'post',
                    url: '/deletePubProj',
                    data:{
                        id: value.projectId,
                        projectName: value.projectName,
                        username: value.username
                    }
                }).then((res)=>{
                    if(res.data.code == 1){
                        self.$message({
                            message: '删除成功！',
                            type: 'success'
                        })
                        self.getProjInfo();
                    }
                })
            }).catch(()=>{
                console.log('取消删除')
            })
        }
    },
    beforeMount(){
        this.getProjInfo();
    }
}
</script>

<style>
    .cell{
        text-align: center;
    }
</style>

<style lang="scss" scoped>
.user-info{
    padding: 20px;
    h1{
        margin-top: 20px;
        text-align: center;
    }
}
</style>