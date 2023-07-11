import { createWebHistory, createRouter } from 'vue-router'
import { LocalExtConfig } from 'element-ext/src/config'
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
      component: Login,
      meta: {
        withoutAuth: true,
        title: '登录'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        withoutAuth: false,
        title: '404 NotFound'
      }
    }
  ]
  const router = createRouter({
    // history mode guide :https://router.vuejs.org/zh/guide/essentials/history-mode.html
    history: createWebHistory(),
    routes // `routes: routes` 的缩写
  })
  router.beforeEach((to, from) => {
    const token = localStorage.getItem('ext_token')
    const { withoutAuth } = to.meta
    if (!withoutAuth && !token && to.name !== 'Login') {
      // 将用户重定向到登录页面
      const loginID = LocalExtConfig().router.loginId
      const path = loginID ? '/login/' + loginID : '/login/index'
      return { path, replace: true, query: { from: to.fullPath } }
    }
  })
  router.beforeResolve(async to => {
    const appName = LocalExtConfig().app.name
    const { title } = to.meta
    if (title) {
      document.title = appName ? title + ' | ' + appName : title
    }
  })
  return router
}
