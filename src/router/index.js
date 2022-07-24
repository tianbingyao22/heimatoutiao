import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
// 路由懒加载
// 首页加载时加载App.js，会将App上所有的路由请求都加载一边，会导致页面加载速度变慢
// 因此使用路由懒加载，不用app，js加载路由，而是在路由规则中用component:()=>import("组件路径")来单独请求需要显示的路由
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => {
      return import('@/views/Login')
    }
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/detail',
    component: () => import('@/views/Detail')
  },
  {
    path: '/user',
    component: () => import('@/views/User')
  }
]

const router = new VueRouter({
  routes
})

export default router
