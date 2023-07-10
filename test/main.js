import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { Init } from 'element-ext'

const app = createApp(App)

/* 引入基础404和登录路由视图 路由才能正常运行 */
const notFoundView = import('element-ext/src/view/NotFound.vue') // 404视图可以使用element-ext默认视图，或自定义导入
const loginView = import('./HelloWorld.vue') // 登录视图需要自定义，可以调用element-ext默认登录组件或自定义导入
Init(app, notFoundView, loginView)
app.mount('#app')
