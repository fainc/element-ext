const ExtConfig = { // .env 静态配置
  request: { // 请求配置
    baseURL: import.meta.env.VITE_EXT_REQUEST_BASEURL || '/', // 请求根路径
    timeout: import.meta.env.VITE_EXT_REQUEST_TIMEOUT || 0, // 请求超时时间 默认不超时
    hideLoading: import.meta.env.VITE_EXT_REQUEST_HIDELOADING || false, // 默认参与loading，单个请求无需loading设置为true
    loadingDebounce: import.meta.env.VITE_EXT_REQUEST_LOADINGDEBOUNCE || 300, // 请求短耗时loading延迟时长（请求队列多少ms后才显示loading）
    loadingText: import.meta.env.VITE_EXT_REQUEST_LOADINGTEXT || '处理中', // 请求loading文本
    originalHeader: import.meta.env.VITE_EXT_REQUEST_ORIGINALHEADER || false, // 默认进行header注入，支持单个请求config配置
    originalResponse: import.meta.env.VITE_EXT_REQUEST_ORIGINALRESPONSE || false, // 默认进行返回数据格式化校验，支持单个请求config配置，需要原样返回response设置为true
    signHeaders: import.meta.env.VITE_EXT_REQUEST_SIGNHEADERS || 'Nonce,Timestamp,App-Id,Authorization', // 参与header注入签名的header字段
    rejectError: import.meta.env.VITE_EXT_REQUEST_REJECTERROR || false// 默认不 reject error（无需catch），支持单个请求config配置
  }
}

/**
 * 获取本地动态配置（localstorage，读取用户级配置，优先级高于Env）
 * @constructor
 */
export const LocalExtConfig = () => {
  return {
    request: {
      appID: localStorage.getItem('ext_app_id') || import.meta.env.VITE_EXT_REQUEST_APPID || '', // 请求自动注入header App-ID
      signSecret: localStorage.getItem('ext_sign_secret') || import.meta.env.VITE_EXT_REQUEST_SIGNSECRET || '', // 请求签名密钥
      signAlgo: localStorage.getItem('ext_sign_algo') || import.meta.env.VITE_EXT_REQUEST_SIGNALGO || 'md5' // 请求签名算法
    }
  }
}
export default ExtConfig
