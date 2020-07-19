// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入rem.js
import './assets/js/rem'
//引入清除默认样式
import './assets/css/reset.css'
//全局引入阿里图标库
import './assets/font/iconfont.css'
//全局引入动画库
import 'animate.css/animate.min.css'


//封装全局过滤器
//import toPrice from './filter/toPrice'
//Vue.filter('toPrice',toPrice)
import gFilter from './filter'
for(let i in gFilter){
  Vue.filter(i,gFilter[i])
}


//封装一个全局组件
import gCom from './common'
console.log(gCom,'模块 对象')
//对对象进行循环
for(let i in gCom){
  console.log(i,'是谁')
  Vue.component(i,gCom[i])
}
/* let obj = {
  a:'1',
  b:'2',
  0:'3'
}
obj.a  
obj[0]
obj.0 */
//Vue.component('',)
/* //返回按钮
import goBack from './common/goBack'
console.log(goBack,'组件')
Vue.component('goBack',goBack)

//搜索按钮
import goSearch from './common/search.vue'
Vue.component('goSearch',goSearch) */

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
