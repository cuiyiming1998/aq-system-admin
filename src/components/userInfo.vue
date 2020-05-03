<template>
    <div class="user-info">
        <h1>用户信息</h1>
        <el-table
            :data="users.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
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
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="按用户名查找"/>
                </template>
                <template slot-scope="scope">
                    <el-button type="primary" size="small" v-if="scope.row.access == 'enable'" @click="ableUser(scope.row,'disable','禁用')">禁用</el-button>
                    <el-button type="primary" size="small" v-if="scope.row.access == 'disable'" @click="ableUser(scope.row,'enable','解禁')">解禁</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h1>管理员信息 <i class="el-icon-circle-plus-outline add-admin" @click="dialogVisible = true"></i></h1>
        <el-dialog
        title="添加管理员"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :model="adminForm" :rules="rules" ref="adminForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="adminForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="adminForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="使用者姓名" prop="name">
                <el-input v-model="adminForm.name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addAdmin('adminForm')">确 定</el-button>
        </span>
        </el-dialog>
        <el-table
            :data="admins"
            height="250">
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
            admins: [],
            search: '',
            dialogVisible: false,
            adminForm:{
                username: '',
                password: '',
                name: ''
            },
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
            }
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
                        self.$message({
                            message: `${option}成功！`,
                            type: 'success'
                        })
                    }
                })
            }).catch(()=>{
            })
        },
        // 添加管理员
        addAdmin(formName){
            let self = this;
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    console.log('success');
                    axios({
                        method: 'post',
                        url: '/addAdmin',
                        data:{
                            username: self.adminForm.username,
                            password: self.adminForm.password,
                            name: self.adminForm.name
                        }
                    }).then((res)=>{
                        if(res.data.code == 1){
                            self.$message({
                                message: '添加成功！',
                                type: 'success'
                            })
                            self.resetForm(formName);
                            self.dialogVisible = false;
                            self.getUserInfo();
                        }
                    })
                }else{
                    console.log('error');
                    return false;
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
    .add-admin{
        margin: 0 20px;
        cursor: pointer;
    }
    .add-admin:hover{
        color: #409EFF
    }
}
</style>