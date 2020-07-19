<template>
    <div>
        <h1>movieDetail</h1>
        <h1>接收到的动态query参数是{{$route.query.id}}</h1>
    </div>
</template>
<script>
export default {
    mounted() {
        console.log(this.$route,'电影详情')
    },
}
</script>
<style lang="" scoped>
    
</style>