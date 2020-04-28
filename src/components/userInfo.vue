<template>
    <div class="user-info">
        <h1>用户信息</h1>
        <el-table
            :data="users"
            height="500">
            <el-table-column
                label="id">
                <template slot-scope="scope">
                    <span>{{ scope.row.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户名">
            </el-table-column>
            <el-table-column
                prop="email"
                label="E-mail">
            </el-table-column>
            <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.access == 'disable' " style="color:red">禁用</span>
                    <span v-else style="color: green">正常</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="time"
                label="注册时间">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" v-if="scope.row.access == 'enable'" @click="ableUser(scope.row,'disable','禁用')">禁用</el-button>
                    <el-button type="primary" size="small" v-if="scope.row.access == 'disable'" @click="ableUser(scope.row,'enable','解禁')">解禁</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h1>管理员信息</h1>
        <el-table
            :data="admins"
            height="200">
            <el-table-column
                prop="userId"
                label="id">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户名">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            users: [],
            admins: []
        }
    },
    methods:{
        ableUser(row,able,option){
            let self = this;
            this.$confirm(`确认${option}此用户吗？`,'提示',{
                confirmButonText: '是',
                cancelButtonText: '取消',
            }).then(()=>{
                axios({
                    method: 'post',
                    url: '/ableUser',
                    data:{
                        userId: row.userId,
                        able: able
                    }
                }).then((res)=>{
                    if(res.data.code == 1){
                        self.getUserInfo();
                    }
                })
            }).catch(()=>{

            })
        },
        // 获取数据
        getUserInfo(){
            let self = this;
            axios({
                method: 'get',
                url: '/userInfo'
            }).then((res)=>{
                if(res.data.code == 1){
                    self.users = res.data.users;
                    self.admins = res.data.admins;
                }
            })
        }
    },
    beforeMount(){
        this.getUserInfo();
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