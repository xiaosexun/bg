<template>
    <div>
        <button @click='$router.go(-1)'>返回</button>
        <h1>美食详情</h1>
        <!-- 获取到这个值之后，通过id可以跳去接口 -->
        <h1>获取到的动态参数是---{{$route.params.id}}</h1>

    </div>
</template>
<script>
export default {
    mounted() {
        console.log(this.$route,'路由对象信息')
    },
}
</script>
<style lang="" scoped>
    
</style>