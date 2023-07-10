<script setup>
import { ref } from 'vue'
import I18n from '../../i18n/index.js'
import IFrameDialog from '../iframe/iframe-dialog.vue'
import LoginPassword from './form/login-password.vue'
import { useRoute, useRouter } from 'vue-router'
const iframeRef = ref()
const props = defineProps({
  method: {
    type: Array,
    default: () => {
      return ['password']
    }
  },
  legal: {
    type: Array,
    default: () => {
      return [] // [{name:'xxx',href:'xxx','target':'_blank/popup'}]
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
const legalChecked = ref(false)
const notTrustChecked = ref(false)
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
const openIframe = (i, e) => {
  iframeRef.value.Open(i, '', e, i === props.legal.length - 1 ? I18n.t('ext.login.legalAcceptAll') : I18n.t('ext.login.legalNext') + ' ' + props.legal[i + 1].name)
}
const iframeConfirm = (i) => {
  if (i === props.legal.length - 1) {
    legalChecked.value = true
  } else {
    openIframe(i + 1, props.legal[i + 1].href)
  }
}
</script>

<template>
<div class="main">
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
      </div>
      <div class="legal" v-if="props.legal.length !== 0">
        <el-checkbox v-model="legalChecked" label="" size="large" class="legal-check" />
        {{$t('ext.login.legalAccept')}}
        <template v-for="(item,i) in props.legal" :key="i">
          {{i === 0 ?'&nbsp;':',&nbsp;'}}<el-link @click="openIframe(i,item.href)"  class="legal-item">{{ item.name }}</el-link>
        </template>
      </div>
    <div class="legal" v-if="props.legal.length !== 0">
      <el-checkbox v-model="notTrustChecked" label="" size="large" class="legal-check" />
     这是临时设备，缩短登录有效期并开启自动退出
    </div>

  </div>
</div>
  <i-frame-dialog ref="iframeRef"  @confirm="iframeConfirm"/>
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
.legal{
  font-size: 12px;
  display: flex;
  align-items: center;
  color: #909399;
  flex-wrap: wrap;
}
.legal-check{
  margin-right: 8px;
  height: 14px;
}
.legal-item{
  font-size: 12px;
line-height: normal;
}
</style>
