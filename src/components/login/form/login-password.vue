<script setup>
import { ref } from 'vue'
const form = ref({
  account: '',
  password: ''
})
const emit = defineEmits(['login'])
const handleLogin = () => {
  emit('login', 'password', { ...form.value })
}
</script>

<template>
  <div class="login-form">
    <el-form
        label-position="top"
        label-width="100px"
    >
      <el-form-item >
        <el-input class="form-input" v-model="form.account" :placeholder="$t('ext.login.accountPlaceholder')"/>
      </el-form-item>
      <el-form-item >
        <el-input class="form-input" v-model="form.password" type="password" show-password :placeholder="$t('ext.login.passwordPlaceholder')"/>
      </el-form-item>
      <el-form-item label="">
        <el-button class="login-btn" type="primary" :disabled="!form.account || !form.password" @click="handleLogin">{{$t("ext.login.btn")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login-form{
  padding: 20px 0;
}
.form-input{
  width: 100%;
  height: 42px;
}
.login-btn{
  width: 100%;
  height: 42px;
}
</style>
