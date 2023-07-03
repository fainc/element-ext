import { ElMessage, ElMessageBox } from 'element-plus'

export const HandleResponse = (response) => {
  const { // 标准接口返回格式
    code,
    data
  } = response?.data || {}
  if (code === undefined || data === undefined) { // 非标准接口返回
    ElMessage({
      message: '请求目标返回格式错误，详见控制台',
      type: 'error'
    })
    return Promise.reject(new Error('接口未定义code及data，第三方或非标准接口请设置config.originalResponse = true 以接收未格式化校验的原始数据'))
  }
  if (code !== response.status) { // 非标准接口返回
    ElMessage({
      message: '请求目标返回格式错误，详见控制台',
      type: 'error'
    })
    return Promise.reject(new Error('标准接口成功状态返回的code应当与http状态码一致,第三方或非标准接口请设置config.originalResponse = true 以接收未格式化校验的原始数据'))
  }
  return data
}

function showError (message, ext = '') {
  if (!ext) {
    ElMessage({
      message,
      type: 'error'
    })
    return
  }
  ElMessageBox.alert(ext, message, {
    showConfirmButton: false,
    autofocus: false,
    type: 'error'
  })
}

export const HandleError = (error) => {
  if (error?.response?.status === 401) {
    localStorage.removeItem('ext_token')
    window.location.reload()
    return '401 Unauthorized'
  }
  const data = error?.response?.data
  if (!data) {
    showError(error?.message || '未知网络错误')
    return error?.message || '未知网络错误'
  }
  const {
    message,
    ext
  } = data
  showError(message || '未知服务器错误', ext)
  return message
}
