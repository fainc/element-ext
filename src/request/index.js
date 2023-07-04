import axios from 'axios'
import ExtConfig from '../config/index.js'
import { LoadingTask } from './loading.js'
import { HeaderSet } from './header.js'
import { HandleResponse, HandleError } from './response.js'

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
  rejectError: conf.rejectError
}
const instance = axios.create(defaultConfig)

/**
 * 请求拦截处理
 */
instance.interceptors.request.use(function (config) {
  const { hideLoading, originalHeader } = config
  if (!hideLoading) {
    LoadingTask(true)
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
    return error
  }
  const errorMessage = HandleError(error)
  if (error?.config && !rejectError) { // 默认返回一个pending中的promise，请求不会进入catch中（Invalid URL之类的底层错误读不到config，应当 reject）
    return new Promise(() => {})
  }
  return Promise.reject(errorMessage)
})

/**
 * 暴露实例
 * @constructor
 */
export const RequestInstance = instance

/**
 * 格式化请求方法
 * @param method
 * @param uri
 * @param params
 * @param config
 * @constructor
 */
export const Request = (method, uri, params = {}, config = {}) => {
  switch (method) {
    case 'get':
      return instance.get(uri, { params, ...config })
    case 'delete':
      return instance.delete(uri, { params, ...config })
    case 'head':
      return instance.head(uri, { params, ...config })
    case 'options':
      return instance.options(uri, { params, ...config })
    case 'post':
      return instance.post(uri, params, { ...config })
    case 'put':
      return instance.put(uri, params, { ...config })
    case 'patch':
      return instance.patch(uri, params, { ...config })
  }
  return new Promise(function (resolve, reject) {
    return reject(new Error('请求method错误'))
  })
}
