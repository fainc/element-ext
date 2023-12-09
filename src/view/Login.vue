<script setup>
import ExtLogin from '../components/login/ExtLogin.vue'

</script>
<template>
<!-- 这是一个演示文件，示例调用Login组件，请在项目src/view目录自建Login.vue文件以便router自动加载组件-->
  <ExtLogin :method="['password','sms','qr']">
    <template v-slot:footer>
    </template>
  </ExtLogin>
</template>

<style scoped>

</style>
