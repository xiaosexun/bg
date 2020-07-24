<template>
    <div>
        <el-container>
            <el-header>
                XXX大型后台管理项目
                <div class="info">
                    <div class="username">
                        {{getName}}
                    </div>
                    <el-button type='danger' @click='logOut' size='small'>退出</el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <v-nav></v-nav>
                </el-aside>
                <el-main>
                    <!-- 二级路由出口 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import vNav from '../common/nav'
export default {
    data() {
        return {}
    },
    components:{
        vNav
    },
    computed: {
        getName(){
            let data =''
            data = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : ''
            return data.username
        }
    },
    methods: {
        //退出事件
        logOut(){
            sessionStorage.removeItem('userInfo')
            //跳转到登录页
            this.$router.push('/login')
        }
    },
}
</script>

<style  lang="stylus" scoped>
@import '../../stylus/index.styl';

.el-header {
    background-color: $bgColor;
    color: #333;
    line-height 60px
    color  #fff
}
.info 
    float right
    margin-right 20px 
    .username
        color #fff 
        float left
        margin-right 20px
</style>
