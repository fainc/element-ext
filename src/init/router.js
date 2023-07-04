import HelloWorld from '../components/HelloWorld.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  { path: '/', component: HelloWorld }
]
const Router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default Router
