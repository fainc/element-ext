<template>
  <div class="not-found">
   <div class="not-found-main">
     <div>
       <el-image class="not-found-image" :src="imageUrl" fit="fill"/>
     </div>
     <div class="title">
       404
     </div>
     <div class="desc">
       {{$t('ext.404NotFound')}}
     </div>
     <div>
       <el-button type="primary" @click="back" class="back" plain> {{ $t('ext.goBack') }}</el-button>
     </div>
   </div>
    <div class="copyright">
      Copyright © {{ new Date().getFullYear() }} {{copyright}}
    </div>
  </div>
</template>

<script setup>
import image from '../assets/result/not-found.gif'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import EventReport from '../utils/event-report/index.js'
const route = useRoute()
const imageUrl = ref(`${image}`)
const copyright = import.meta.env.VITE_EXT_COPYRIGHT || ''
onMounted(() => {
  EventReport('ext.router.404', route.fullPath)
})
const back = () => {
  window.history.back()
}
</script>

<style scoped>
.not-found {
  position: relative;
  display: flex;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.not-found-main{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.not-found-image{
  width: 252px;height: 252px;
}
.title{
  font-size: 24px;margin:25px 0;
}
.desc{
  color: rgba(0,0,0,.45);
  margin: 0 25px 30px;
  font-size: 14px;
}
.back{
  margin-top: 30px;
}
.copyright{
  color: #A3A6AD;
  font-size: 14px;
  flex: 0 0 50px;
}
</style>
