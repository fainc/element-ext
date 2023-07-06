import { createI18n } from 'vue-i18n'
import LoadJson from './load.js'
console.log(window.navigator.language)
const getLang = () => {
  return window.navigator.language
}
export const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: localStorage.getItem('ext_lang') || getLang() || 'zh-CN', // 本地缓存 > 浏览器语言 > 默认
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      ext: await LoadJson('ext_zh_cn')
    },
    'en-US': {
      ext: await LoadJson('ext_en_us')
    }
  }
}) // I18n用于返回给VUE安装注册 实现模板 $t 等操作，请勿直接调用

const I18n = i18n.global // i18n全局实例，可直接使用

export const ChangeLocale = (locale, storage = true, reload = false) => {
  if (storage) {
    localStorage.setItem('ext_lang', locale)
  }
  I18n.locale.value = locale
  if (reload) {
    window.location.reload()
  }
}
export default I18n
