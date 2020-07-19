<template>
    <div>
       <div class="container">
        <header class="header">
            <div class="wrap">
                <go-back></go-back>
                <h2>我的订单</h2>
                <div class="points">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
        <div class="name">
            <div class="wrap clearfix">
                <div class="head">
                </div>
                <div class="na">
                    <p class="p1">幽朔</p>
                    <p class="p2">V1</p>
                </div>
                <div class="qiandao">
                    每日签到
                </div>
            </div>
        </div>
        <div class="mypro">
            <div class="wrap">
                <div class="box1" v-for="(item,i) in nav" :key="i">
                    <!-- <a href="#"> -->
                        <img :src="item.img" alt="">
                        <p>{{item.name}}</p>
                    <!-- </a> -->
                </div>
            </div>
        </div>
        <ul>
            <li v-for="(item,i) in choose" :key="i">
                <div class="wrap">
                    <!-- <a href="#"> -->
                        <img class="img4" :src="item.img" alt="">
                        <span>{{item.name}}</span>
                        <img class="right" src="../../assets/images/mine_images/right.jpg" alt="">
                    <!-- </a> -->
                </div>
            </li>
        </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            nav:[
                {
                    img:require("../../assets/images/mine_images/icon_1.jpg"),
                    name:"全部订单"
                },
                {
                    img:require("../../assets/images/mine_images/icon_2.jpg"),
                    name:"待付款"
                },
                {
                    img:require("../../assets/images/mine_images/icon_3.jpg"),
                    name:"待收货"
                }
            ],
            choose:[
                {
                    img:require("../../assets/images/mine_images/icon_4.jpg"),
                    name:"地址管理"
                },
                {
                    img:require("../../assets/images/mine_images/icon_5.jpg"),
                    name:"我的钱包"
                },
                {
                    img:require("../../assets/images/mine_images/icon_6.jpg"),
                    name:"我的优惠券"
                },
                {
                    img:require("../../assets/images/mine_images/icon_8.jpg"),
                    name:"我的小伙伴"
                },
                {
                    img:require("../../assets/images/mine_images/icon_7.jpg"),
                    name:"我的二维码"
                },
            ]
        }
    }
}
</script>
<style lang="" scoped>
@import '../../assets/css/mine.css';
    
</style>