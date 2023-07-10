<script setup>
import { ref } from 'vue'
import ExtUploader from 'element-ext/src/components/uploader/ExtUploader.vue'
const extUploader = ref(ExtUploader)
defineProps({
  msg: String
})
const testRequest = () => {
  const params = new URLSearchParams()
  params.append('param1', 'value1')
  params.append('param2', 'value2')
  const form = new FormData()
  form.append('file', '12')
}
const testFile = (e) => {
  const file = e.target.files[0]
  const form = new FormData()
  form.append('file', file)
}
const testUpload = () => {
  extUploader.value.Open('上传一个文件', '/upload/config', 'test')
}
const catchFiles = (f = []) => {
  console.log(f)
}
</script>

<template>
  <el-button @click="testRequest">网络测试GET</el-button>
  <el-button @click="testUpload">测试上传</el-button>
  <input type="file" ref="clearFile" @change="testFile($event)" multiple="multiplt" class="add-file-right-input">
  <ExtUploader ref="extUploader" @catch="catchFiles"/>
</template>

<style scoped>

</style>
