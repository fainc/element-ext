import { MakeSignature } from './signature.js'
import { LocalExtConfig } from '../config/index.js'
import I18n from '../i18n/index.js'
/**
 * 随机请求字符串
 * @param e
 */
function randomString (e) {
  e = e || 32
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const a = t.length
  let n = ''
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

/**
 * 默认请求头设置，自动注入Authorization，Nonce，Timestamp，Signature（后端验证对接参考signature.js）
 * @param config
 * @constructor
 */
export const HeaderSet = (config) => {
  const token = localStorage.getItem('ext_token')
  if (token) {
    config.headers.set('Authorization', 'Bearer ' + token, false)
  }
  config.headers.set('Accept-Language', I18n?.locale?.value || 'zh-CN') // 默认 随机请求字符串
  config.headers.set('Nonce', randomString(32), false) // 默认 随机请求字符串
  config.headers.set('App-Id', LocalExtConfig().request.appID, false) // 请求App-Id
  config.headers.set('Timestamp', new Date().getTime(), false) // 默认 请求时间戳
  config.headers.set('Signature', MakeSignature(config), false)// 默认 请求签名
  return config
}
