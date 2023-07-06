/**
 * 初始化，在main.js 调用
 */
import 'element-plus/dist/index.css'
import '../css/common/fix.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { InitRouter } from '../router'
import I18n, { i18n } from '../i18n/index.js'
export const Init = (app, notFoundView, loginView = null) => {
  app.use(ElementPlus, { size: 'default', zIndex: 2000, locale: zhCn })
  app.use(InitRouter(notFoundView, loginView))
  app.use(i18n)
}
