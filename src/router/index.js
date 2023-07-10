import { createWebHistory, createRouter } from 'vue-router'
import NotFound from '../view/NotFound.vue'
import Login from '../../src/view/Login.vue' // 跳出node_modules目录，需要在项目/src/view/自建Login.vue，可参考包内的Login.vue直接使用
export const InitRouter = () => {
  /**
   * 基础路由
   * @type {[{path: string, component: *},{path: string, component: *}]}
   */
  const routes = [
    {
      path: '/login/:id',
      name: 'Login',
      component: Login
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
  return createRouter({
    // history mode guide :https://router.vuejs.org/zh/guide/essentials/history-mode.html
    history: createWebHistory(),
    routes // `routes: routes` 的缩写
  })
}
