import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  //路由模式
  mode: 'history',
  routes: [{
      path: '/login',
      component: () => import('@/components/pages/login')
    },
    {
      path: '/index',
      component: () => import('@/components/pages/index'),
      children: [{
          path: '/menu',
          component: () => import('@/components/views/menu'),
          meta:{//自定义对象
            name:'菜单管理'
          }
        },
        {
          path: '/user',
          component: () => import('@/components/views/user'),
          meta:{//自定义对象
            name:'用户管理'
          }
        },
        {
          path: '/goods',
          component: () => import('@/components/views/goods')
        }, {
          path: '/home',
          component: () => import('@/components/views/home')
        },
        {
            path: '/role',
            component: () => import('@/components/views/role'),
            meta:{
                name:'角色管理'
            }
          },
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
