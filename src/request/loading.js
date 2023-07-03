import { ElLoading } from 'element-plus'
import { useDark } from '@vueuse/core'
import _ from 'lodash'
import ExtConfig from '../config/index.js'
let loadingTask = 0
let loadingInstance = null

function joinLoading () {
  if (loadingTask === 0) {
    toShowLoading()
  }
  loadingTask++
}

/**
 * 300ms后没有结束请求队列显示loading
 */
const toShowLoading = _.debounce(() => {
  if (loadingTask >= 1 && !loadingInstance) {
    const isDark = useDark()
    const background = isDark.value ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)'
    loadingInstance = ElLoading.service({
      lock: true,
      text: ExtConfig.request.loadingText,
      background
    })
  }
}, parseInt(ExtConfig.request.loadingDebounce))

const toHideLoading = () => {
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}

function removeLoading () {
  loadingTask--
  loadingTask = Math.max(loadingTask, 0)
  if (loadingTask === 0) {
    toHideLoading()
  }
}

/**
 * 请求任务管理
 * @param isJoin
 * @constructor
 */
export const LoadingTask = (isJoin = false) => {
  if (isJoin) {
    joinLoading()
  } else {
    removeLoading()
  }
}
