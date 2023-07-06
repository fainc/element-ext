import { createWebHistory, createRouter } from 'vue-router'

export const InitRouter = (notFoundView, loginView = null) => {
  /**
   * 基础路由
   * @type {[{path: string, component: *},{path: string, component: *}]}
   */
  const routes = [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../view/NotFound.vue')
    }
  ]
  if (loginView) {
    routes.push({
      path: '/login/:id',
      name: 'Login',
      component: () => import('../../src/view/Login.vue') // 跳出node_modules目录
    })
  }
  return createRouter({
    // history mode guide :https://router.vuejs.org/zh/guide/essentials/history-mode.html
    history: createWebHistory(),
    routes // `routes: routes` 的缩写
  })
}
