import Vue from 'vue'
import Router from 'vue-router'
//一级路由
import Index from '@/components/pages/index'
//二级路由
// import Home from '@/components/views/home'
// import Car from '@/components/views/car'
// import Mine from '@/components/views/mine'
// import Sure from '@/components/views/sure'
// import ProList from '@/components/views/pro-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      component:Index,
      children:[
        {
          path:'/home',
          component:()=>import('@/components/views/home')
          
        },
        {
          path:'/car',
          component:()=>import('@/components/views/car')
         
        },
        {
          path:'/mine',
          component:()=>import('@/components/views/mine')
          
        },
        {
          path:'/sure',
          component:()=>import('@/components/views/sure')
          
        },
        {
          path:'/pro-list',
          component:()=>import('@/components/views/pro-list')
          
        },
        {//重定向
      path:'',
      redirect:'/home'
    }
      ]
    },
    {
      path:"/classify",
      // alias:'/shopping',//别名
      component:()=>import('@/components/pages/pro-classify')
    },
    {
      path:'/detail',
      component:()=>import('@/components/pages/pro-detail')
    },
    {//重定向
      path:'*',
      redirect:'/index'
    }
  ]
})
