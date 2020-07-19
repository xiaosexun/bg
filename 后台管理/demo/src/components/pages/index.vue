<template>
  <div>
    <el-container>
      <el-header>后台管理</el-header>
      <el-container>
        <el-aside width="200px">
         <v-nav></v-nav>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from '../common/nav'
export default {
    data(){
        return{
            
        }
    },
    components:{
        vNav
    }
};
</script>

<style  lang="stylus" scoped>
@import '../../stylus/index.styl';

.el-header {
  background: lightblue;
}
.el-menu
    min-height 600px
</style>
