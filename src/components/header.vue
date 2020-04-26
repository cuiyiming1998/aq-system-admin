<template>
    <div class="header">
        <div class="title">问卷调查系统后台管理</div>
        <div class="rightBtn" @click="Logout">退出登录</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    methods: {
        handleSelect(key, keyPath) {
        },
        Logout(){
            this.$message({
                message: '退出登录成功',
                type: 'success'
            })
            this.$router.push({path:'/login'})
        },
    },
    beforeMount:function(){
    }
}
</script>

<style lang="scss" scoped>
    .header{
        width: 100vw;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #545c64;
        color: white;
        .title{
            width: 370px;
            height: 70px;
            line-height: 70px;
            font-size: 1.7em;
            text-align: center;
            cursor: default;
        }
        .rightBtn{
            height: 70px;
            width: 100px;
            line-height: 70px;
            text-align: center;
            cursor: pointer;
        }
    }
</style>