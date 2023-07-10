<script>
</script>
<script setup>

import { ref } from 'vue'
const props = defineProps({
  border: {
    type: String,
    default: () => {
      return '0'
    }
  }
})
const emit = defineEmits(['confirm'])
const visible = ref(false)
const src = ref('')
const title = ref('')
const confirm = ref(null)
const key = ref('')
const handleConfirm = () => {
  visible.value = false
  emit('confirm', key.value)
}
const Open = (k, t, s, c) => {
  visible.value = true
  key.value = k
  title.value = t
  src.value = s
  confirm.value = c
}
defineExpose({ Open })
</script>

<template>
  <el-dialog
      v-model="visible"
      align-center
      :title="title"
      destroy-on-close
      :close-on-click-modal="false"
  >
    <iframe :src="src"  :frameborder="props.border" class="iframe-box"></iframe>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">{{$t('ext.common.close')}}</el-button>
        <el-button type="primary" @click="handleConfirm" v-if="confirm">
          {{confirm}}
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<style scoped>
.iframe-box{
  width: 100%;
  height: 100%;
  min-height: 500px;
}
</style>
