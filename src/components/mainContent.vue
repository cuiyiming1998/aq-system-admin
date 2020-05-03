<template>
<div class="main">
    <div class="container-left">
        <el-menu
            :default-active="activeIndex"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409EFF"
        >
            <router-link to="/systemInfo">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">系统信息</span>
                </el-menu-item>
            </router-link>
            <router-link to="/userInfo">
                <el-menu-item index="2">
                    <i class="el-icon-user"></i>
                    <span slot="title">用户信息</span>
                </el-menu-item>
            </router-link>
            <router-link to="/projInfo">
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">问卷信息</span>
                </el-menu-item>
            </router-link>
            <router-link to="/answerInfo">
                <el-menu-item index="4">
                    <i class="el-icon-s-data"></i>
                    <span slot="title">答案信息</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
    <div class="container-right">
        <router-view  @changeActiveIndex="changeActiveIndex($event)"></router-view>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            activeIndex: "1"
        }
    },
    methods:{
        changeActiveIndex:function(value){
            this.activeIndex = value
        },
        toUserInfo: function(){
            this.$router.push({ path: '/userInfo'})
        }
    }
}
</script>

<style lang="scss" scoped>
.main{
    width: 100vw;
    height: calc(100vh - 70px);
    display: flex;
    a{
        text-decoration: none;
    }
    .container-left{
        width: 200px;
        padding: 20px 0;
        text-align: center;
        background-color: #545c64;
        .el-menu{
            border-right-width: 0;
            .items{
                color: white;
            }
            .items:hover{
                background-color: #434A50;
            }
            .items:active{
                background-color: #434A50;
            }
        }
        .menu{
            background-color: transparent;
        }
    }
    .container-right{
        width: calc(100vw - 200px);
    }
}
</style>