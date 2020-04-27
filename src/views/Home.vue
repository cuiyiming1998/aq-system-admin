<template>
    <div class="home">
        <header-com></header-com>
        <el-container class="main">
            <main-content></main-content>
        </el-container>
    </div>
</template>

<script>
import headerCom from "../components/header.vue";
import mainContent from "../components/mainContent.vue";

export default {
    name: "Home",
    components: {
        headerCom,
        mainContent
    }
};
</script>

<style lang="scss" scoped>
.home {
    height: 100vh;
    width: 100vw;
    .main {
        margin: 0;
        padding: 0;
        display: flex;
    }
}
</style>
