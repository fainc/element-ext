<script setup>
import Request from '../src/request/index.js'

const getApi = () => {
  Request.Get('http://rap2api.taobao.org/app/mock/303099/groupInfo/list', { id: 1 }, {
    encrypt: true,
    encryptMethod: 'rsa'
  }).then(res => {

  })
}
const postApi = () => {
  Request.Post('http://rap2api.taobao.org/app/mock/303099/imageInfo/list', { id: 3 }, {
    encrypt: true,
    encryptMethod: 'sm2'
  }).then(res => {

  })
}
</script>

<template>
  <router-view></router-view>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
