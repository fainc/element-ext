<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { Request } from '../../request/index.js'

const config = ref({
  title: '上传文件',
  uri: '',
  resource: ''
})
const dialogVisible = ref(false)
const Open = (title, uri, resource) => {
  config.value.title = title || '上传文件'
  config.value.uri = uri || ''
  config.value.resource = resource || 'default'
  getConfig().then(c => {
    const { endpoint, config, accept } = c // 返回格式要求
    dialogVisible.value = true
  })
}
const handleClose = (done) => {
  ElMessageBox.confirm('确定关闭吗？未上传的文件不会保存。')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const getConfig = () => {
  return Request('get', config.value.uri, { resource: config.value.resource })
}
const confirm = () => {
  Request('put', config.value.uri, [], { hideLoading: true })
  dialogVisible.value = false
  emit('catch', [])
}
defineExpose({ Open })
const emit = defineEmits(['catch'])
</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      :title="config.title"
      width="50%"
      :before-close="handleClose"
      destroy-on-close
      :close-on-click-modal="false"
      :center="false"
  >
    <div>
      <el-upload
          class="upload-demo"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          :accept="config.accept || ''"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽文件到此处或 <em>点击选择</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            支持上传图片文件，单文件最大100kb
          </div>
        </template>
      </el-upload>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="confirm">
          确认上传
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
