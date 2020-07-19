<template>
  <div>
    <div class="container">
      <header class="header">
        <div class="wrap">
          <go-back></go-back>
          <h2>购物车</h2>
          <div class="points">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      <ul class="pro-list">
        <li v-for="(item,i) in carList" :key="i">
          <i class="checked"></i>
          <img :src="item.img" alt />
          <p>
            <span class="pro-name">{{item.name}}</span>
            <span class="pro-des">规格 {{item.size}}</span>
            <span class="pro-price">￥{{item.price}}</span>
          </p>
          <div class="count-group">
            <input type="button" value="-" />
            <input type="text" value="1" />
            <input type="button" value="+" />
          </div>
          <div class="del">删除</div>
        </li>
        <!-- <li class="active">
          <i></i>
          <img src="../../assets/images/shoping_car_images/shop.jpg" alt />
          <p>
            <span class="pro-name">欧莱雅面霜</span>
            <span class="pro-des">规格 50g</span>
            <span class="pro-price">￥199.00</span>
          </p>
          <div class="count-group">
            <input type="button" value="-" />
            <input type="text" value="1" />
            <input type="button" value="+" />
          </div>
          <div class="del">删除</div>
        </li> -->
      </ul>
      <div class="pay clearfix">
        <i class="checked"></i>
        <span class="all">全选</span>
        <span class="tobuy">去结算（2件）</span>
        <div class="box">
          <p class="p1">
            总计：
            <span>163.00</span>
          </p>
          <p class="p2">不含运费，已优惠￥0.00</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            carList:[
                {
                    img:require("../../assets/images/shoping_car_images/shop1.jpg"),
                    name:'欧莱雅面霜',
                    size:'50g',
                    price:'199.00'
                },
                {
                    img:require("../../assets/images/shoping_car_images/shop2.jpg"),
                    name:'资源洗发水',
                    size:'300ml',
                    price:'79.00'
                },
                {
                    img:require("../../assets/images/shoping_car_images/shop3.jpg"),
                    name:'欧莱雅面霜',
                    size:'50g',
                    price:'199.00'
                },
            ]
        }
    }
};
</script>
<style lang="" scoped>
@import '../../assets/css/shopCar.css'
</style>