<script setup>
import ExtLogin from '../components/login/ExtLogin.vue'
</script>

<template>
<!-- 这是一个演示文件，示例调用Login组件，请在项目src/view目录自建Login.vue文件以便router自动加载组件-->
  <ExtLogin :method="['password','sms']" :legal="[{name:'用户协议',href:'https://lf3-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/juejin/86857833-55f6-4d9e-9897-45cfe9a42be4.html'},{name:'隐私政策',href:'https://terms.alicdn.com/legal-agreement/terms/suit_bu1_taobao/suit_bu1_taobao201703241622_61002.html'}]"/>
</template>

<style scoped>

</style>
