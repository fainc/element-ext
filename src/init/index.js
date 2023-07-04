/**
 * 初始化，在main.js 调用
 */
import 'element-plus/dist/index.css'
import '../css/common/fix.css'
import Router from './router.js'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export const Init = (app) => {
  app.use(ElementPlus, { size: 'default', zIndex: 2000, locale: zhCn })
  app.use(Router)
}
