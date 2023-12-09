<script setup>

import { ref } from 'vue'
import LoginPassword from './form/login-password.vue'
import { useRoute, useRouter } from 'vue-router'
const copyright = import.meta.env.VITE_EXT_COPYRIGHT || ''
const appName = import.meta.env.VITE_EXT_APPNAME || ''
const appDesc = import.meta.env.VITE_EXT_APPDESC || ''
const props = defineProps({
  method: {
    type: Array,
    default: () => {
      return ['password']
    }
  },
  uri: {
    type: Object,
    default: () => {
      return { password: '/login/password', twoStep: '/login/password-two-step', sms: '/login/sms/send', qrcode: '/login/qr' }
    }
  }
})
const route = useRoute()
const router = useRouter()
const methodName = ref(props.method[0])
const handleMethodClick = (e) => {
  console.log(e)
}
const handleLogin = (e, f) => {
  loginSuccess('token')
}
const loginSuccess = (token) => {
  localStorage.setItem('ext_token', token)
  const from = route.query?.from
  if (from) {
    router.replace(String(from))
  } else {
    router.back()
  }
}
</script>

<template>
<div class="main">
 <div class="app-title" v-if="appName || appDesc">
   <div class="app-name" v-if="appName">{{appName}}</div>
   <div class="app-desc" v-if="appDesc">{{appDesc}}</div>
 </div>
  <div class="login-window">
      <div class="login-method">
        <el-tabs v-model="methodName" class="demo-tabs" @tab-click="handleMethodClick">
          <template v-for="(item,i) in props.method" :key="i">
            <el-tab-pane v-if="item === 'password'" :label="$t('ext.login.methodPassword')"  name="password">
                <login-password @login="handleLogin"/>
            </el-tab-pane>
            <el-tab-pane v-if="item === 'sms'" :label="$t('ext.login.methodSms')"  name="sms">

            </el-tab-pane>
          </template>
        </el-tabs>
        <slot name="footer"></slot>
        <div class="copyright">
          Copyright © {{ new Date().getFullYear() }} {{copyright}}
        </div>
      </div>
  </div>
</div>
</template>

<style scoped>
.main{
  background: #f3f4f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.login-window{
  background: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
  width: 336px;
}
.copyright{
  font-size: 12px;
  color: #A3A6AD;
  text-align: right;
}
.app-title{
  padding-bottom: 50px;
}
.app-name{
  font-size: 30px;
  padding-bottom: 10px;
  color: #333333;
  text-align: center;
}
.app-desc{
  text-align: center;
  color: #888888;
}
</style>
