import Vue from 'vue'
import Router from 'vue-router'
//一级路由组件
import Index from '@/components/pages/index'
import FoodList from '@/components/pages/foodList'
import FoodDetail from '@/components/pages/foodDetail'
import MovieList from '@/components/pages/movieList'
// import MovieDetail from '@/components/pages/movieDetail'
const  MovieDetail = ()=> Promise.resolve(import('@/components/pages/movieDetail'))
//二级路由组件
// import Home from '@/components/views/home'
// import Sort from '@/components/views/sort'
// import Car from '@/components/views/car'
//import Mine from '@/components/views/mine'
//路由懒加载
const Mine = ()=> import('@/components/views/mine')

Vue.use(Router)

const r = new Router({
  mode:'history',
  routes: [
    {
      path: '/index',
      component: Index,
      children:[
        {
          path:"/home",
          component:()=>import('@/components/views/home')
        },
        {
          path:"/sort",
          component:()=>import('@/components/views/sort')
        },
        {
          path:"/car",
          alias:'/shopping',//别名
          component:()=>import('@/components/views/car')
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
/*       beforeEnter(to,from,next){
          //这个方法用的不多
          console.log(to,'去哪里')
          console.log(from,'从哪里来')
          //如果来源是home 就next 否则就跳转到home页
          if(from.path=='/home'||from.path='/foodDetail'){
              next()
          }else{
              next('/home')
          }
          
      } */
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
      path: '/movieDetail/:id',
      component: MovieDetail,
      name:'fDetail'
    },
    {
        path:'/login',
        component:()=>import('@/components/pages/login')
    },
    {
        path:'/ref',
        component:()=>import('@/components/pages/ref')
    },
    {//重定向
      path:'*',
      redirect:'/index'
    }
  ]
})

/* 
需求：
所有组件的渲染，必须要先登录，不登录，不能跳转到任何组件
如果未登录就强制跳转到登录页面，利用全局导航守卫，前置导航钩子函数去实现
 */
//console.log(r,'路由的配置对象')
//前置钩子导航函数
r.beforeEach((to,from,next)=>{
    // console.log(to,'ttttt')
    // console.log(from,'ffffff')
    //当我们没有写next的时候，就被拦截
    //逻辑判断 如果你跳转的地址是登录就next,否则我就强制跳转到登录
   // next()
   if(to.path=='/login'){
       next()
       return
   }
   //判断当前账号是否登录，如果登录，就next，否则就依然是去登录页
   let isLogin = sessionStorage.getItem('isLogin')
   if(isLogin){
       next()
       return
    }
   next('/login')
})
//后置
r.afterEach((to,from)=>{

})


export default r
