<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 路由导航 -->
    <div class="footer">
      <router-link activeClass='active' to="/home">首页</router-link>
      <router-link activeClass='active' to="/sort">分类</router-link>
      <router-link activeClass='active' to="/car">购物车</router-link>
      <router-link activeClass='active' to="/mine">个人中心</router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="" scoped>
.footer{
    position: fixed;
    display: flex;
    width: 100%;
    height: 1.2rem;
    bottom: 0;
    left: 0;
    line-height: 1.2rem;
}
.footer a{
    flex:1;
    text-align: center;
    text-decoration: none;
    color: green;
    background: #cccccc;
}
.active{
        color: goldenrod !important;
    background: pink !important;
}
</style>