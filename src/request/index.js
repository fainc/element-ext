import axios from 'axios'
import ExtConfig from '../config/index.js'
import { LoadingTask } from './loading.js'
import { HeaderSet } from './header.js'
import { HandleResponse, HandleError } from './response.js'
import { ElMessageBox } from 'element-plus'
import { crypto } from './crypto.js'
/**
 * 默认配置实例初始化
 */
const conf = ExtConfig.request
const defaultConfig = {
  baseURL: conf.baseURL,
  timeout: conf.timeout,
  hideLoading: conf.hideLoading,
  originalHeader: conf.originalHeader,
  originalResponse: conf.originalResponse,
  rejectError: conf.rejectError,
  encryptMethod: conf.encryptMethod
}
const instance = axios.create(defaultConfig)

/**
 * 请求拦截处理
 */
instance.interceptors.request.use(function (config) {
  const { hideLoading, originalHeader, encrypt, encryptMethod } = config
  if (!hideLoading) {
    LoadingTask(true)
  }
  if (encrypt) {
  // 通过config.method判断传data或params
    switch (config.method) {
      case 'post':
        config.data = Object.keys(config.data).length ? { data: crypto(config.data, encryptMethod) } : {}
        break
      case 'put':
        config.data = Object.keys(config.data).length ? { data: crypto(config.data, encryptMethod) } : {}
        break
      case 'patch':
        config.data = Object.keys(config.data).length ? { data: crypto(config.data, encryptMethod) } : {}
        break
      case 'get':
        config.params = Object.keys(config.params).length ? { data: crypto(config.params, encryptMethod) } : {}
        break
      case 'delete':
        config.params = Object.keys(config.params).length ? { data: crypto(config.params, encryptMethod) } : {}
        break
      case 'head':
        config.params = Object.keys(config.params).length ? { data: crypto(config.params, encryptMethod) } : {}
        break
      case 'options':
        config.params = Object.keys(config.params).length ? { data: crypto(config.params, encryptMethod) } : {}
        break
    }
  }
  if (!originalHeader) {
    config = HeaderSet(config)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * 响应拦截处理
 */
instance.interceptors.response.use(function (response) {
  const { hideLoading, originalResponse } = response?.config || {}
  if (!hideLoading) {
    LoadingTask(false)
  }
  if (originalResponse) {
    return response
  }
  return HandleResponse(response)
}, function (error) {
  const { hideLoading, rejectError, originalResponse } = error?.config || {}
  if (!hideLoading) {
    LoadingTask(false)
  }
  if (originalResponse) {
    return Promise.reject(error)
  }
  const errorMessage = HandleError(error)
  if (error?.config && !rejectError) { // 默认返回一个pending中的promise，请求不会进入catch中（Invalid URL之类的底层错误读不到config，应当 reject）
    return new Promise(() => {})
  }
  return Promise.reject(errorMessage)
})

/**
 * 暴露请求实例
 * @constructor
 */
export const RequestInstance = instance

/**
 * 格式化请求
 * @param uri
 * @param config
 * @returns {{Delete: (function({}=): Promise<axios.AxiosResponse<any>>), Options: (function({}=): Promise<axios.AxiosResponse<any>>), Head: (function({}=): Promise<axios.AxiosResponse<any>>), Post: (function({}=): Promise<axios.AxiosResponse<any>>), Get: (function({}=): Promise<axios.AxiosResponse<any>>), Patch: (function({}=): Promise<axios.AxiosResponse<any>>), Put: (function({}=): Promise<axios.AxiosResponse<any>>)}}
 * @constructor
 */
const Request = {
  Get (uri, params = {}, config = {}) {
    return requestConfirm(config?.confirm).then(() => instance.get(uri, { params, ...config }))
  },
  Delete (uri, params = {}, config = {}) {
    return requestConfirm(config?.confirm).then(() => instance.delete(uri, { params, ...config }))
  },
  Head (uri, params = {}, config = {}) {
    return requestConfirm(config?.confirm).then(() => instance.head(uri, { params, ...config }))
  },
  Options (uri, params = {}, config = {}) {
    return requestConfirm(config?.confirm).then(() => instance.options(uri, { params, ...config }))
  },
  Post (uri, params = {}, config = {}) {
    return requestConfirm(config?.confirm).then(() => instance.post(uri, params, { ...config }))
  },
  Put (uri, params = {}, config = {}) {
    return requestConfirm(config?.confirm).then(() => instance.put(uri, params, { ...config }))
  },
  Patch (uri, params = {}, config = {}) {
    return requestConfirm(config?.confirm).then(() => instance.patch(uri, params, { ...config }))
  }
}
const requestConfirm = (confirm) => {
  if (!confirm) {
    return Promise.resolve()
  }
  /** 新建promise消除确认提示的reject */
  return new Promise((resolve) => {
    ElMessageBox.confirm(
      confirm,
      // '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => resolve()).catch(() => {}) // 内部catch未确认
  })
}
export default Request
