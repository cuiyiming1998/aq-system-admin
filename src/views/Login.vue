<template>
    <div class="main">
        <el-form class="container" :rules="rules" ref="loginForm" :model="loginForm">
            <div class="items">
                <h1>调查问卷系统后台管理</h1>
            </div>
            <el-form-item class="items" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入管理员账号" class="input"></el-input>
            </el-form-item>
            <el-form-item class="items" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" class="input"></el-input>
            </el-form-item>
            <el-button type="primary" @click="login('loginForm')" class="btn">登录</el-button>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            loginForm:{
                username: '',
                password: '',
            },
            rules:{
                username:[
                        {
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        },
                ],
                password:[
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                ]
            }
        }
    },
    methods:{
        login(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    let self = this;
                    axios({
                        method: 'post',
                        url: '/login',
                        data:{
                            username: self.loginForm.username,
                            password: self.loginForm.password,
                        }
                    }).then((res)=>{
                        if(res.data.code == 1){
                            self.$store.dispatch('login',self.loginForm.username).then(()=>{
                                self.$router.push({ path: '/' })
                            })
                        }else if(res.data.code == 2){
                            self.$message({
                                type: 'error',
                                message: '账号或密码错误！'
                            })
                            self.loginForm.username = '';
                            self.loginForm.password = '';
                        }
                    })
                }else{
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .main{
        height: 100vh;
        width: 100vw;
        background: #abcdef;
        display: flex;
        justify-content: center;
        .container{
            min-width: 450px;
            height: 400px;
            margin-top: 150px;
            padding: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #336699;
            color: white;
            .items{
                height: 100px;
                width: 85%;
                padding: 20px;
                text-align: center;
                h1{
                    margin: 0;
                    font-size: 1.7em;
                }
            }
            .input /deep/ .el-input__inner{
                margin-top:20px;
                width: 100%;
                height:35px;
                line-height: 35px;
                font-size: 16px;
                border-radius: 2px;
                border: none;
                border-bottom: 1px solid gray;
                outline: none;
                background-color: transparent;
                color: white;
            }
            input::-webkit-input-placeholder {
                color: #ccc;
            }
            input::-moz-placeholder {
                color: #ccc;
            }
            input::-ms-input-placeholder {
                color: #ccc;
            }
            .el-button--primary{
                margin: 30px;
                width: 70%;
            }
        }
    }
</style>