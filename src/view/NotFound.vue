<template>
  <div class="not-found">
    <div>
      <el-image class="not-found-image" :src="imageUrl" fit="fill"/>
    </div>
    <div style="font-size: 24px;margin-bottom: 15px">
      404
    </div>
    <div style="margin-bottom: 25px;color: rgba(0,0,0,.45);
    font-size: 14px;line-height: 1.6">
      {{$t('ext.404NotFound')}}
    </div>
    <div>
      <el-button type="primary" @click="tes" class="back" plain> {{ $t('ext.GoBack') }}</el-button>
    </div>
    <div style="position: absolute;bottom: 50px;color: #999999">
      Copyright © {{ new Date().getFullYear() }} {{copyright}}
    </div>
  </div>

</template>

<script setup>
import image from '../assets/result/not-found.gif'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import EventReport from '../utils/event-report/index.js'
import Request from '../request/index.js'
const route = useRoute()
const imageUrl = ref(`${image}`)
const copyright = import.meta.env.VITE_EXT_COPYRIGHT || ''
onMounted(() => {
  EventReport('ext.router.404', route.fullPath)
})
const back = () => {
  window.history.back()
}
const tes = () => {
  Request.Get('/hello', {}, { confirm: '确定删除吗，删除后无法找回' }).then(e => {
    console.log(e)
  })
}
</script>

<style scoped>
.not-found {
  position: relative;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  flex-direction: column;
}
.not-found-image{
  width: 252px;height: 252px
}
.back{
  margin-top: 30px;
}
</style>
