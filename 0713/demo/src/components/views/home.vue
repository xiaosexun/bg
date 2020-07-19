<template>
  <div>
    <header class="header">
      <div class="wrap">
        <h1>
          <a href="#">
            <img src="../../assets/images/index_images/logo.jpg" alt />
          </a>
        </h1>
        <input type="text" placeholder="寻找商品" />
        <div class="points">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
    <nav class="nav">
      <div class="wrap">
        <ul>
          <li class="first">
            <a href="#">推荐</a>
          </li>
          <li v-for="(item,i) in navList" :key="i">
            <a href="#">{{item}}</a>
          </li>
        </ul>
        <span class="arrow">
          <img src="../../assets/images/index_images/arrow.jpg" />
        </span>
      </div>
    </nav>
    <div class="banner">
      <a href="#">
        <img src="../../assets/images/index_images/banner.jpg" alt />
      </a>
    </div>
    <div class="icon-nav">
      <div class="item" v-for="(item,i) in iconNav" :key="i">
        <a href="#">
          <img :src="item.img" alt />
          <p>{{item.name}}</p>
        </a>
      </div>
    </div>
    <div class="sale">
      <div class="left">
        <a href="#">
          <h3>
            <img src="../../assets/images/index_images/timer.jpg" alt />
            {{sale[0].name}}
          </h3>
          <p class="des">{{sale[0].show}}</p>
          <p class="time">
            <span>19</span>:
            <span>30</span>:
            <span>29</span>
            <i>秒杀</i>
          </p>
          <img class="pic" :src="sale[0].img" alt />
          <div class="price">
            ￥
            <span>14.8</span>
          </div>
        </a>
      </div>
      <div class="right">
        <div class="top clearfix">
          <a href>
            <h1>
              {{sale[1].name}}
              <span>折</span>
            </h1>
            <h2>{{sale[1].show}}</h2>
            <img class="pic1" src="../../assets/images/index_images/brand.jpg" alt />
            <img class="pic2" :src="sale[1].img" alt />
          </a>
        </div>
        <div class="bottom">
          <div class="le">
            <a href="#">
              <p class="p1">{{sale[2].name}}</p>
              <p class="p2">{{sale[2].show}}</p>
              <img :src="sale[2].img" alt />
            </a>
          </div>
          <div class="ri">
            <a href="#">
              <p class="p1">{{sale[3].name}}</p>
              <p class="p2">{{sale[3].show}}</p>
              <img :src="sale[3].img" alt />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="banner2">
      <a href="#">
        <img src="../../assets/images/index_images/bar.jpg" alt />
      </a>
    </div>
    <!-- <div class="pro-list">
      <div class="wrap">
        <div class="nav-top">
          <ul class="clearfix">
            <li class="first">
              <a href="#">热门推荐</a>
            </li>
            <li>
              <a href="#">发现好货</a>
            </li>
            <li>
              <a href="#">只看专场</a>
            </li>
            <li>
              <a href="#">只看商品</a>
            </li>
          </ul>
        </div>
        <div class="pro clearfix">
          <a href="#">
            <img src="../../assets/images/index_images/shop_4.jpg" alt />
            <div class="detail">
              <p class="p1">雅诗兰黛染发膏20ml</p>
              <p class="p2">
                <span>￥</span>29.9
              </p>
              <p class="p3">已售800件</p>
              <span class="buy">立即抢购</span>
            </div>
          </a>
        </div>

        <div class="pro clearfix">
          <a href="#">
            <img src="../../assets/images/index_images/shop_4.jpg" alt />
            <div class="detail">
              <p class="p1">雅诗兰黛染发膏20ml</p>
              <p class="p2">
                <span>￥</span>29.9
              </p>
              <p class="p3">已售800件</p>
              <span class="buy">立即抢购</span>
            </div>
          </a>
        </div>
        <div class="pro clearfix">
          <a href="#">
            <img src="../../assets/images/index_images/shop_4.jpg" alt />
            <div class="detail">
              <p class="p1">雅诗兰黛染发膏20ml</p>
              <p class="p2">
                <span>￥</span>29.9
              </p>
              <p class="p3">已售800件</p>
              <span class="buy">立即抢购</span>
            </div>
          </a>
        </div>
      </div>
    </div> -->
    <div class="pro-list">
        <div class="wrap">
            <div class="nav-top">
                <ul class="clearfix">
                    <li @click='choose(i)' :class="[i==num ?'first ':'']" v-for='(item,i) in list' :key="i">
                            {{item.tit}}</li>
                </ul>
            </div>
            <div class="pro clearfix" v-for='(item,i) in list[num].goods' :key="i">
                <a href="#">
                    <img :src="item.img" alt="">
                    <div class="detail">
                        <p class="p1">{{item.name}}</p>
                        <p class="p2"><span>￥</span>{{item.price}}</p>
                        <p class="p3">已售{{item.num}}件</p>
                        <span class="buy">立即抢购</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        num:0,
      navList: ["女装", "鞋包", "居家", "母婴童装", "鞋包", "居家"],
      iconNav: [
        {
          img: require("../../assets/images/index_images/icon_1.jpg"),
          name: "限时抢购"
        },
        {
          img: require("../../assets/images/index_images/icon_2.jpg"),
          name: "积分商城"
        },
        {
          img: require("../../assets/images/index_images/icon_3.jpg"),
          name: "联系我们"
        },
        {
          img: require("../../assets/images/index_images/icon_4.jpg"),
          name: "商品分类"
        }
      ],
      sale: [
        {
          name: "限时秒杀",
          show: "每天零点场 好货秒不停",
          img: require("../../assets/images/index_images/shop_5.jpg")
        },
        {
          name: "品牌上新",
          show: "每晚9点 抢大牌",
          img: require("../../assets/images/index_images/shop_1.jpg")
        },
        {
          name: "每日十件",
          show: "只为你选好货",
          img: require("../../assets/images/index_images/shop_2.jpg")
        },
        {
          name: "拼啊",
          show: "超级好价拼团",
          img: require("../../assets/images/index_images/shop_3.jpg")
        }
      ],
      list: [
        {
          tit: "热门推荐",
          goods: [
            {
              img:
                "https://image2.suning.cn/uimg/cms/img/156756354662165548.jpg",
              name: "PPTV智能电视50VU4",
              price: "1999",
              num: "800"
            },
            {
              img:
                "https://imgservice5.suning.cn/uimg1/b2c/atmosphere/J2WcrydlCg209LrducYVHQ.jpg?format=400w_400h_4e",
              name: "长虹55D4P",
              price: "2999",
              num: "300"
            },
            {
              img:
                "https://imgservice2.suning.cn/uimg1/b2c/atmosphere/93m8H-0CrNEyAHS0jAJKuw.jpg?format=400w_400h_4e",
              name: "海信(Hisense)H55E3A",
              price: "2888",
              num: "200"
            },
            // {
            //   img:
            //     "https://imgservice4.suning.cn/uimg1/b2c/atmosphere/VxhRdBH-3FpRJyUOyB-8Cw.jpg?format=400w_400h_4e",
            //   name: "55英寸液晶平板电视机",
            //   price: "3888",
            //   num: "1500"
            // }
          ]
        },
        {
          tit: "发现好货",
          goods: [
            {
              img:
                "https://imgservice5.suning.cn/uimg1/b2c/image/-aLz1a09-YB7VvhHs4zA4w.jpg_400w_400h_4e",
              name: "【中华特色】乌兰察布馆 ",
              price: "99",
              num: "20"
            },
            {
              img:
                "https://imgservice4.suning.cn/uimg1/b2c/image/e6yIl6yY6HXnHwJvUpVvdw.jpg_400w_400h_4e",
              name: "【中华特色】营口馆",
              price: "29",
              num: "300"
            },
            {
              img:
                "https://image.suning.cn/uimg/b2c/newcatentries/0070122375-000000000826275032_1.jpg?format=400w_400h",
              name: "【中华特色】乌兰察布馆 ",
              price: "28",
              num: "200"
            },
            {
              img:
                "https://imgservice.suning.cn/uimg1/b2c/image/02nT-of3OWxVoOWi8s_Thw.jpg?format=400w_400h",
              name: "【中华特色】乌兰察布馆",
              price: "32",
              num: "15"
            }
          ]
        },
        {
          tit: "只看专场",
          goods: [
            {
              img:
                "https://image2.suning.cn/uimg/cms/img/156756354662165548.jpg",
              name: "PPTV智能电视50VU4",
              price: "1999",
              num: "800"
            },
            {
              img:
                "https://imgservice5.suning.cn/uimg1/b2c/atmosphere/J2WcrydlCg209LrducYVHQ.jpg?format=400w_400h_4e",
              name: "长虹55D4P",
              price: "2999",
              num: "300"
            },
            {
              img:
                "https://imgservice2.suning.cn/uimg1/b2c/atmosphere/93m8H-0CrNEyAHS0jAJKuw.jpg?format=400w_400h_4e",
              name: "海信(Hisense)H55E3A",
              price: "2888",
              num: "200"
            },
            {
              img:
                "https://imgservice4.suning.cn/uimg1/b2c/atmosphere/VxhRdBH-3FpRJyUOyB-8Cw.jpg?format=400w_400h_4e",
              name: "55英寸液晶平板电视机",
              price: "3888",
              num: "1500"
            }
          ]
        },
        {
          tit: "发现好货",
          goods: [
            {
              img:
                "https://imgservice5.suning.cn/uimg1/b2c/image/-aLz1a09-YB7VvhHs4zA4w.jpg_400w_400h_4e",
              name: "【中华特色】乌兰察布馆 ",
              price: "99",
              num: "20"
            },
            {
              img:
                "https://imgservice4.suning.cn/uimg1/b2c/image/e6yIl6yY6HXnHwJvUpVvdw.jpg_400w_400h_4e",
              name: "【中华特色】营口馆",
              price: "29",
              num: "300"
            },
            {
              img:
                "https://image.suning.cn/uimg/b2c/newcatentries/0070122375-000000000826275032_1.jpg?format=400w_400h",
              name: "【中华特色】乌兰察布馆 ",
              price: "28",
              num: "200"
            },
            {
              img:
                "https://imgservice.suning.cn/uimg1/b2c/image/02nT-of3OWxVoOWi8s_Thw.jpg?format=400w_400h",
              name: "【中华特色】乌兰察布馆",
              price: "32",
              num: "15"
            }
          ]
        }
      ]
    };
  },
  methods: {
            choose(i) {
                this.num = i;

            }
        }
};
</script>
<style lang="" scoped>
@import "../../assets/css/index.css";
</style>