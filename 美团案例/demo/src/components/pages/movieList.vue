<template>
  <div>
    <h1>电影列表</h1>
    <ul>
      <li @click="goDetail(item.id)" v-for="item in foodList" :key="item.id">
        <p>{{item.name}}</p>
        <img :src="item.img" alt />
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
          name: "羊肉串"
        },
        {
          id: 2,
          img: require("../../assets/images/2.jpg"),
          name: "满汉全席"
        },
        {
          id: 3,
          img: require("../../assets/images/3.jpg"),
          name: "海鲜盛宴"
        }
      ]
    };
  },
  methods: {
    goDetail(id) {
      //第一种方式
      // this.$router.push(`/movieDetail?id=${id}`)
      //第二种方法
      this.$router.push({
        path: "/movieDetail",
        query: {
          id
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