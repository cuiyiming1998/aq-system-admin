<template>
  <div class="home">
      <header-com></header-com>
      <el-container class="main">
        <sidebar></sidebar>
      </el-container>
  </div>
</template>

<script>
import headerCom from '../components/header.vue'
import sidebar from '../components/sidebar'

export default {
  name: 'Home',
  components: {
    headerCom,
    sidebar
  }
}
</script>

<style lang="scss" scoped>
  .home{
    height: 100vh;
    width: 100vw;
    .main{
      margin: 0;
      padding: 0;
      display: flex;
    }
  }
</style>
