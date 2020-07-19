<template>
    <div>
        <go-back></go-back>
        <h1>movieDetail</h1>
        <h1>接收到的动态query参数是{{$route.query.id}}</h1>
        <button @click="changeId">点击事件</button>
        <h1>{{id}}</h1>
        <hr />
        <router-link to="/movieDetail/2">
            <button>组件一</button>
        </router-link>
        <router-link to="/movieDetail/3">
            <button>组件2222</button>
        </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id: ''
        }
    },
    mounted() {
        console.log(this.$route, '电影详情')
    },
    methods: {
        changeId() {
            console.log(this.$route.query.id, 'id值')
            this.id = this.$route.query.id
        }
    },
    //导航钩子函数
    //进入组件之前
    /*     beforeRouteEnter(to,from,next){
        //在这个函数中有没有this
        //在这个阶段没有this,因为还没有进入到组件
        console.log(this,'vue组件实例')
            console.log(to,'组件')
        console.log(from,'组件')
        if(from.path=='/movieList' || to.path=='/movieDetail'){
            next()
        }else{
           next('/movieList') 
        }

    }, */
    //组件更新
    beforeRouteUpdate(to, from, next) {
        //不刷新整个组件，然后地址动态变化，才能触发这个更新导航钩子
        console.log(to, '更新11')
        console.log(from, '更新22')
    },
    // //离开组件之前
    beforeRouteLeave(to, from, next) {
        //一般我们执行 清除清定时器 等等一些内容
        //在离开之前还是存在this
        console.log(this, '当前实例')
        console.log(to, '离开')
        console.log(from, '离开')
        next()
    }
}
</script>
<style lang="" scoped>
</style>