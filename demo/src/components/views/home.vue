<template>
  <div class="home">
    <!-- 利用路由导航跳转 -->
    <router-link tag="div" to="/foodList">
      <div class="box">美食</div>
    </router-link>

    <div @click="goMovie" class="box">电影</div>
  </div>
</template>
<script>
export default {
  methods: {
    goMovie() {
      //路由编程式导航
      /* 
            push 它的原理window.history  它是向历史记录中添加一条记录
            replace 它是替换当前录
            push和replace都能够实现跳转，区别是什么
            go
             */
      // console.log(this)
      this.$router.push("/movieList");
      //this.$router.replace('/movieList')
    }
  }
};
</script>
<style lang="" scoped>
@import '../../assets/css/home.css';
.box {
  height: 1.6rem;
}
</style>