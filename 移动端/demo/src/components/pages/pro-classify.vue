<template>
  <div>
    <div class="container">
      <header class="header">
        <div class="wrap">
          <go-back></go-back>
          <h2>商品分类</h2>
          <div class="points">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      <div class="content clearfix">
        <!-- <div class="wrap clearfix"> -->
        <div class="left">
          <ul>
            <li class="first">
              <span></span>
              <a href="#">
                  潘婷
              </a>
            </li>
            <li v-for="(item,i) in nav" :key="i">
              <a href="#">{{item}}</a>
            </li>
            
          </ul>
        </div>
        <div class="right">
          <div class="box1">
            <div class="nav clearfix">
              <span class="sp1">
                <a href="#">洗发水</a>
              </span>
              <span class="sp2">
                <a href="#">更多></a>
              </span>
            </div>

            <ul>
              <li>
                <a href="#">
                  <img src="../../assets/images/classify/shop_1.jpg" alt />
                  去屑洗发水
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../assets/images/classify/shop_1.jpg" alt />
                  去屑洗发水
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../assets/images/classify/shop_1.jpg" alt />
                  去屑洗发水
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <img src="../../assets/images/classify/shop_1.jpg" alt />
                  去屑洗发水
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../assets/images/classify/shop_1.jpg" alt />
                  去屑洗发水
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../assets/images/classify/shop_1.jpg" alt />
                  去屑洗发水
                </a>
              </li>
            </ul>
          </div>
          <div class="box2">
            <div class="nav">
              <span class="sp1">
                <a href="#">染发类</a>
              </span>
              <span class="sp2">
                <a href>更多></a>
              </span>
            </div>
            <ul>
              <li>
                <a href="#">
                  <img src="../../assets/images/classify/shop_2.jpg" alt />
                  <br />施华蔻染色
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../assets/images/classify/shop_2.jpg" alt />
                  <br />施华蔻染色
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../assets/images/classify/shop_2.jpg" alt />
                  <br />施华蔻染色
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            nav:['施华蔻','沙宣','海飞丝','滋源','阿道夫','飘柔']
        }
    }
};
</script>
<style lang="" scoped>
@import '../../assets/css/classify.css'
</style>