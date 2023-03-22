// https://router.vuejs.org/zh/
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: true, parent: '#app' })

// 定义路由，每个路由都需要映射到一个组件
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dataManage',
  },
  // 数据管理
  {
    path: '/dataManage',
    name: 'dataManage',
    component: () => import('../views/dataManage/index.vue'),
  },
  // 批量设置
  {
    path: '/feeSetting',
    name: 'feeSetting',
    component: () => import('../views/feeSetting/index.vue'),
  },
  // 调价管理
  {
    path: '/priceManage',
    name: 'priceManage',
    component: () => import('../views/priceManage/index.vue'),
  },
  // 重定向
  {
    path: '/:catchAll(.*)',
    redirect: '/login',
  },
]

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

router.beforeEach((_to, _from, next) => {
  NProgress.start() // start progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

// 导出路由实例，并在 `main.ts` 挂载
export default router
