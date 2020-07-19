// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入rem.js
import './assets/js/remScale'

//封装一个全局组件
import gCom from './common'
console.log(gCom,'模块 对象')
//对对象进行循环
for(let i in gCom){
  console.log(i,'是谁')
  Vue.component(i,gCom[i])
}


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
