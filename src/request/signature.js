import hmacSHA256 from 'crypto-js/hmac-sha256.js'
import Base64 from 'crypto-js/enc-base64'
import ExtConfig, { LocalExtConfig } from '../config/index.js'
/**
 *  请求签名
 * @param config
 * @constructor
 */
export const MakeSignature = (config) => {
  const local = LocalExtConfig()?.request
  const signSecret = local.signSecret
  if (!signSecret) {
    return null
  }
  const params = extractParams(config)
  const headers = extractHeaders(config)
  const s = params.concat(headers)
  s.sort()
  const str = s.join('&')
  if (import.meta.env.MODE === 'development') {
    console.log('Debug signature data =>', s)
    console.log('Debug signature str =>', str)
  }
  return Base64.stringify(hmacSHA256(str, signSecret))
}

/**
 * 提取签名请求头
 * @param config
 * @returns {*[]}
 */
function extractHeaders (config) {
  const { signHeaders } = ExtConfig?.request
  const s = signHeaders.split(',')
  if (s === null || s === undefined || s.length === 0) {
    return []
  }
  const list = []
  s.forEach(k => {
    if (k !== undefined && k !== null && k !== '') {
      const v = config.headers.get(k)
      if (v !== undefined && v !== null && v !== '') {
        list.push('header.' + String(k) + '=' + String(v))
      }
    }
  })
  return list
}

/**
 * 提取签名参数
 * @param config
 */
function extractParams (config) {
  let data = {}
  switch (config.method) {
    case 'get':
    case 'delete':
    case 'head':
    case 'options':
      data = config.params
      break
    case 'post':
    case 'put':
    case 'patch':
      data = config.data
      break
  }
  if (data === null || data === undefined) {
    return []
  }
  return kvStr(config.method, data, [])
}

function extractParamsFromObject (data, p = []) {
  let list = []
  switch (getPrototype(data)) {
    case '[object FormData]':
    case '[object Array]':
    case '[object URLSearchParams]':
      data.forEach((v, k) => {
        list = list.concat(kvStr(k, v, p))
      })
      break
    case '[object Object]':
      Object.keys(data).forEach(function (key) {
        list = list.concat(kvStr(key, data[key], p))
      })
      break
    case '[object FileList]':
      p.push('files')
      Object.keys(data).forEach(function (key) {
        list = list.concat(kvStr(key, data[key], p))
      })
      break
    case '[object File]':
      list = list.concat(kvStr('name', data.name, p), kvStr('type', data.type, p), kvStr('size', data.size, p))
      break
    case '[object Blob]':
      list = list.concat(kvStr('name', 'blob', p), kvStr('type', data.type, p), kvStr('size', data.size, p))
      break
  }
  return list
}

const getPrototype = (v) => {
  return Object.prototype.toString.call(v)
}
const isRangePrototype = (v) => {
  switch (getPrototype(v)) {
    case '[object FormData]':
    case '[object Array]':
    case '[object Object]':
    case '[object FileList]':
    case '[object File]':
    case '[object Blob]':
    case '[object URLSearchParams]':
      return true
    default:
      return false
  }
}
const formatValue = (v) => {
  if (getPrototype(v) === '[object Date]') { // 值为date时特殊处理，以符合请求值一致
    return v.toISOString()
  }
  return String(v)
}
const kvStr = (k, v, p) => {
  const parent = [...p]
  if (v !== null && v !== undefined && v !== '') {
    const isRange = isRangePrototype(v)
    if (!isRange) {
      return p.length >= 1 ? [p.join('.') + '.' + String(k) + '=' + formatValue(v)] : [String(k) + '=' + formatValue(v)]
    }
    if (isRange) {
      parent.push(k)
      return extractParamsFromObject(v, parent)
    }
  }
  return []
}
