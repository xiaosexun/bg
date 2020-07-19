<template>
  <div class="container">
    <router-view></router-view>
    <!-- <div class="container"> -->
    <div class="fixed-menu">
      <div class="con">
        <nav class="nav">
          <router-link activeClass="active" to="/home">
            <a href="#">
              <i></i>
              首页
            </a>
          </router-link>
          <router-link activeClass="active" to="/car">
            <a href="#">
              <i></i>
              购物车
            </a>
          </router-link>
          <router-link activeClass="active" to="/mine">
            <a href="#">
              <i></i>
              我的
            </a>
          </router-link>
        </nav>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
export default {};
</script>
<style lang="" scoped>
.fixed-menu {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.2rem;
}
.fixed-menu .con {
  width: 7.5rem;
  height: 1.2rem;
  margin: 0 auto;
  background-color: #fff;
}
.fixed-menu .nav {
  font-size: 0.22rem;
  width: 6.3rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 0.22rem;
  box-sizing: border-box;
  line-height: 1.8;
}
.fixed-menu .nav a {
  color: #999;
  text-align: center;
}
.fixed-menu .nav a i {
  display: block;
  width: 0.58rem;
  height: 0.58rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
}
.fixed-menu .nav a:first-child i {
  background-image: url("../../assets/images/public/icon_8.jpg");
}
.fixed-menu .nav a:nth-child(2) i {
  background-image: url("../../assets/images/public/icon_7.jpg");
}
.fixed-menu .nav a:nth-child(3) i {
  background-image: url("../../assets/images/public/icon_5.jpg");
}
.active a{
  color:#f26b11 !important;

}
</style>