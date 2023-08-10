import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      redirect: '/main/analysis/overview',
      name: 'main',
      component: () => import('@/views/main/Main.vue'),
      children: []
    },
    //错误地址统一跳转页
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localStorage.getItem(LOGIN_TOKEN)
  // 以/main开头的路径判断
  if (to.path.startsWith('/main') && !token) {
    router.push('/login')
  }
})

export default router
