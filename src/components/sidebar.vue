<template>
    <div class="container">
        <el-menu class="menu"
            active-text-color="#409eff"
        >
            <el-menu-item index="1" class="items">
                <i class="el-icon-menu"></i>
                <span slot="title">系统数据</span>
            </el-menu-item>
            <el-menu-item index="2" class="items">
                <i class="el-icon-menu"></i>
                <span slot="title">用户数据</span>
            </el-menu-item>
            <el-menu-item index="3" class="items">
                <i class="el-icon-menu"></i>
                <span slot="title">问卷数据</span>
            </el-menu-item>
            <el-menu-item index="4" class="items">
                <i class="el-icon-menu"></i>
                <span slot="title">答案数据</span>
            </el-menu-item>
            <el-menu-item index="5" class="items">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="6" class="items">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.container{
    height: calc(100vh - 70px);
    width: 200px;
    padding: 20px 0;
    text-align: center;
    background-color: #545c64;
    .el-menu{
        border-right-width: 0;
    }
    .menu{
        background-color: transparent;
    }
    .items:hover{
        background-color: #434A50;
    }
}
</style>