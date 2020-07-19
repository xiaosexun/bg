<template>
  <div>
         <button @click='$router.go(-1)'>返回</button>
    <h1>美食列表</h1>
    <ul>
      <!-- 路由导航      <li v-for="item in foodList" :key="item.id">
        <router-link tag='div' :to="'/foodDetail/'+item.id+'/a'">
          <p>{{item.name}}</p>
          <img :src="item.img" alt />
        </router-link>
      </li>-->
      <li @click="goDetail(item.id,item.name)" v-for="item in foodList" :key="item.id">
        <p>{{item.name}}</p>
        <img :src="item.img" alt />
        <p>单价是：{{item.price | toPrice}}</p>
        <p>时间：{{item.time|toTime}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      foodList: [
        {
          id: 1,
          img: require("../../assets/images/1.gif"),
          name: "羊肉串",
          price:50,
          time:1594607544769
        },
        {
          id: 2,
          img: require("../../assets/images/2.jpg"),
          name: "满汉全席",
          price:198,
          time:1597607544769
        },
        {
          id: 3,
          img: require("../../assets/images/3.jpg"),
          name: "海鲜盛宴",
          price:388,
          time:1589607544769
        }
      ]
    };
  },
  methods: {
    goDetail(id, x) {
      console.log(this.$route);
      //第一种写法
      //this.$router.push(`/foodDetail/${m}/${n}`)
      //第二种写法
      this.$router.push({
        name: "fDetail",
        params: {
          id,
          x
        }
      });
    }
  }
};
</script>
<style lang="" scoped>
img {
  width: 2rem;
}
</style>