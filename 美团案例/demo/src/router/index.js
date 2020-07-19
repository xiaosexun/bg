import Vue from 'vue'
import Router from 'vue-router'
//一级路由组件
import Index from '@/components/pages/index'
import FoodList from '@/components/pages/foodList'
import FoodDetail from '@/components/pages/foodDetail'
import MovieList from '@/components/pages/movieList'
import MovieDetail from '@/components/pages/movieDetail'
//二级路由组件
import Home from '@/components/views/home'
import Sort from '@/components/views/sort'
import Car from '@/components/views/car'
import Mine from '@/components/views/mine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children:[
        {
          path:"/home",
          component:Home
        },
        {
          path:"/sort",
          component:Sort
        },
        {
          path:"/car",
          component:Car
        },
        {
          path:"/mine",
          component:Mine
        },       
         {
          path:"",
          redirect:"/home"
        }
      ]
    },
    {
      path: '/foodList',
      component: FoodList,
    },
    {
      path: '/foodDetail/:id/:x',
      component: FoodDetail,
      name:'fDetail'
    },
    {
      path: '/movieList',
      component: MovieList
    },
    {
      path: '/movieDetail',
      component: MovieDetail,
      name:'fDetail'
    },
    {//重定向
      path:'*',
      redirect:'/index'
    }
  ]
})
