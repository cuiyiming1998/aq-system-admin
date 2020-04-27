<template>
    <div class="system-info">
        <el-card shadow="hover" class="card">
            <div slot="header">
                <span>总访问量</span>
            </div>
            <div class="content">
                {{ visitors }}
            </div>
        </el-card>
        <el-card shadow="hover" class="card">
            <div slot="header">
                <span>用户总数</span>
            </div>
            <div class="content">
                {{ users }}
            </div>
        </el-card>
        <el-card shadow="hover" class="card">
            <div slot="header">
                <span>问卷总数</span>
            </div>
            <div class="content">
                {{ projects }}
            </div>
        </el-card>
        <el-card shadow="hover" class="card">
            <div slot="header">
                <span>关于</span>
            </div>
            <div class="info">
                <p><span>Name:</span>问卷调查自动生成与分析系统</p>
                <p><span>Version:</span>1.0.1</p>
                <p><span>Github:</span>https://github.com/cuiyiming1998/aq-system-admin</p>
                <p><span>E-mail:</span>atlasyoungcym@163.com</p>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            visitors: 298,
            users: 0,
            projects: 0,
        }
    },
    methods:{
    },
    beforeCreate(){
        let self = this;
        axios({
            method: 'get',
            url: '/systemInfo',
        }).then((res)=>{
            if(res.data.code == 1){
                self.users = res.data.users;
                self.projects = res.data.projects
            }else{
                self.$message({
                    message: '服务器错误，请刷新页面',
                    type: 'error'
                })
            }
        })
    }
}
</script>

<style>
    .el-card__body{
        padding: 0;
        height: 100%;
    }
</style>

<style lang="scss" scoped>
.system-info{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .card{
        width: 40%;
        height: 360px;
        box-sizing: border-box;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        .content{
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 6em;
            .users{
                width: 50%;
            }
            span{
                font-size: 20px;
            }
        }
        .info{
            font-size: 1.1em;
            padding: 20px;
            p{
                line-height: 40px;
                span{
                    font-weight: bolder;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>