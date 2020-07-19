<template>
  <div id="app">
<!--     <div class="title">
      小U商城
    </div> -->
    <transition enter-active-class="animate__animated animate__bounce">
      <!-- 定义一级路由出口 -->
    <router-view></router-view>
    </transition>
  
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/* .title{
  width: 100%;
  height: 1.68rem;
} */
</style>
