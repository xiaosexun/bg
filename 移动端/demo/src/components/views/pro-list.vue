<template>
  <div>
    <div class="container">
      <div class="wrap">
        <header class="header">
          <go-back></go-back>
          <img class="logo" src="../../assets/images/list_images/logo.jpg" alt />
          <div class="points">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </header>
        <div class="search">
          <img src="../../assets/images/list_images/search.jpg" alt />
          <span>搜索商品</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item,i) in proList" :key="i">
              <a href="#">
                <img :src="item.img" alt />
                <div class="pro">
                  <p class="p1">{{item.name}}</p>
                  <p class="p2">
                    <span>￥</span>{{item.price}}
                  </p>
                  <p class="p3">{{item.comment}}条评论</p>
                </div>
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            proList:[
                {
                    img:require("../../assets/images/list_images/pic.jpg"),
                    name:'滋源(seeyoung)生姜强根健发洗头水',
                    price:'159',
                    comment:'66'
                },
                {
                    img:require("../../assets/images/list_images/pic.jpg"),
                    name:'滋源无硅油洗发水535ml',
                    price:'59',
                    comment:'77'
                },
                {
                    img:require("../../assets/images/list_images/pic.jpg"),
                    name:'滋源(seeyoung)护发素200ml',
                    price:'79',
                    comment:'210'
                },
                {
                    img:require("../../assets/images/list_images/pic.jpg"),
                    name:'滋源生姜强根健发洗头水干发',
                    price:'69',
                    comment:'101'
                },
            ]
        }
    }
};
</script>
<style lang="" scoped>
@import "../../assets/css/pro-list.css";
</style>