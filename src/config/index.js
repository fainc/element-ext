// Env 环境静态配置
const ExtConfig = { // .env 静态配置
  request: { // 请求配置
    baseURL: import.meta.env.VITE_EXT_REQUEST_BASEURL || '/', // 请求根路径
    timeout: import.meta.env.VITE_EXT_REQUEST_TIMEOUT || 0, // 请求超时时间 默认不超时
    hideLoading: import.meta.env.VITE_EXT_REQUEST_HIDELOADING || false, // 默认参与loading，单个请求无需loading设置为true
    loadingDebounce: import.meta.env.VITE_EXT_REQUEST_LOADINGDEBOUNCE || 300, // 请求短耗时loading延迟时长（请求队列多少ms后才显示loading）
    loadingText: import.meta.env.VITE_EXT_REQUEST_LOADINGTEXT || '处理中', // 请求loading文本
    originalHeader: import.meta.env.VITE_EXT_REQUEST_ORIGINALHEADER || false, // 默认进行header注入，支持单个请求config配置
    encrypt: import.meta.env.VITE_EXT_REQUEST_ENCRYPT || false, // 默认请求不加密，支持单个请求config配置
    encryptMethod: import.meta.env.VITE_EXT_REQUEST_ENCRYPTSMETHOD || 'rsa', // 默认rsa加密，支持单个请求config配置rsa/sm2
    originalResponse: import.meta.env.VITE_EXT_REQUEST_ORIGINALRESPONSE || false, // 默认进行返回数据格式化并提示、校验错误（如401），支持单个请求config配置，需要原样返回response不进行任何提示或处理设置为true
    signHeaders: import.meta.env.VITE_EXT_REQUEST_SIGNHEADERS || 'App-Id,Authorization,Nonce,Timestamp', // 默认参与header注入签名的header字段
    rejectError: import.meta.env.VITE_EXT_REQUEST_REJECTERROR || false, // 默认不 reject error（无需catch，originalResponse=true除外，需要自行catch），支持单个请求config配置
    publicKeyRsa: import.meta.env.VITE_EXT_REQUEST_PUBLICKEYRSA || 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAucpL9TRMdlKOc2oFZCSPpKfwGBbmCDg9F1DOwg9F9wzaTltL/7XLsq0wa+AX3Uti+yCNhO0Bdvrk5OFgZWSVAcwa/NJ/WWycwmbKoUmL9DeAcCOp+I4qWtPig4yY/4dn3MOM0QK+b27N2d+4ZBezbJrhm7EfcQOzX/A733QlY68lWE8ypNOZlJtrJeojaCLr/xU1JeC/tCdISlc3coDQ+Ye9UKDrgvIKNGmBw1CsFQ4j8sb5fTlgPAHFSr2MKDDGoI9gxx4mSPTrZVJv8Wp/Ala4aAn2CHfsfXQwX6IkW9zgb3gEhSPZR653uTTDsE5HZbltTK1AJLwKu8DYYnwZXQIDAQAB', // rsa公钥
    publicKeySm2: import.meta.env.VITE_EXT_REQUEST_PUBLICKEYSM2 || '04622f734a294f28f65f710d377551b995df28cf767fba6e4f00137f631ae0aefd1278bef872454ad79a247e35f4c1a0cf1707403631c09ab6718bc1acf598991e', // sm2公钥
    privateKeyRsa: import.meta.env.VITE_EXT_REQUEST_PRIVATEKEYRSA || 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5ykv1NEx2Uo5zagVkJI+kp/AYFuYIOD0XUM7CD0X3DNpOW0v/tcuyrTBr4BfdS2L7II2E7QF2+uTk4WBlZJUBzBr80n9ZbJzCZsqhSYv0N4BwI6n4jipa0+KDjJj/h2fcw4zRAr5vbs3Z37hkF7NsmuGbsR9xA7Nf8DvfdCVjryVYTzKk05mUm2sl6iNoIuv/FTUl4L+0J0hKVzdygND5h71QoOuC8go0aYHDUKwVDiPyxvl9OWA8AcVKvYwoMMagj2DHHiZI9OtlUm/xan8CVrhoCfYId+x9dDBfoiRb3OBveASFI9lHrne5NMOwTkdluW1MrUAkvAq7wNhifBldAgMBAAECggEBALm6VKKkjIeAUi1oYElTD1HQHIFIat7usYucWYS/1fZ5n8bTF69iImbVIWHF3LV5hlJ7oV2vvFYfzDBOaZoSqa7pRlVVbL+Nh0wDjC8eIc2aqkfwLxttq0OvK3LMW6qexyJ3Tk8nSg6Fmz1hm6hb1R8N2dlVgJPu2iNfOctRBYuWt8B/Ff3I1qvCYL9Sd0rYZHVUrt5ZghXTslW8fbpGeixr+Fv1Hwtl51ieTiwho2DrCEuagor7SQ++o8/Y/sBQ9IsDo0RJbCmvHEIjM6WtDYN+yap5C2EWLlrGMgwPEajjjwzsdETyQoO/84wgAsKVkVfW7QOWZWpLVXPxzgMcdCECgYEA5devHTv+wgcqpU3U5TFzN0tajthObTZNkLYCH3nb/+JwHp9XXTQv72tc62iV72S029RUU79lbQkcpO5RQneM2cMx3TcA/S+VMRk2/c68kYEVdxU5csKgxzwN13PnelxjBITNTfyb+4H3FcIC3Mt+FT9PzIpKJ5KADhUXej+yjVkCgYEAzu8tUIHPD59xM19eIJPxq89GxJkGIo6VTs5OBe1lsHaETdO55oV5pRjfe90en19jOri2fykr7V9jEyLZwhI0ONeg3M6ClvhHvWMc33fFNTmXEzPFQX9QTMCvPRQw3fnILGbJY9tZIXpCuhlZJTpU4htwdXdShzWeo/8cXZzUF6UCgYBu1Ixaen2kLjSANYG9axT1yt5GF0PqIc9RQpLPfsF5KEWMXqWQCgQ7XPgXg/0YzOTxQ/fN0nMkGsq3NTv14xQGRbubwlQ1wmYcoN4FkVUYjLg/Dfr/vZ4ttGWwSPGL7VTJ7wfY3UCSDN+KnF0o/u8za64dIWoUnu4k3ELP7js5MQKBgC2uCJ/D9/Rn6vI/NCUW43tcxy9w5DTOqtD5o6mVTSRWFUCk412qyz6RrgvGtRLTWLFGwypw6Tx+GP3JbK51nEeL+fukLpmq9xMshNwjsUndi6b2f63Er/Ixer2N7nehwvliO0Sq0BMezQoNvGsGZGSBUCLuEy67vGhRUW6sxvjtAoGBAJEnUwW8aMqb0I1Q+zJcboxreHV/1EkdhPZNCwp9fXtA1ThNdzYrHoDBuZldVmS+F5hf0d4sPlCA7JqFkvfOMDdvRXYsx9hbg3v5w3FQ/8cpNMQx+iotU+M5X11s7h2qN6uZwvrXDTmbG/p9UDp6GMpOV0bIFyL0Vo61VAJKAAKj', // rsa私钥
    privateKeySm2: import.meta.env.VITE_EXT_REQUEST_PRIVATEKEYSM2 || '06f6236fe51a301843397c67057b25fa037a6ae9f0a074cc61a67b29522d9d15' // sm2私钥
  }
}

/**
 * 获取本地动态配置（localstorage，读取用户级配置，优先级高于Env）
 * @constructor
 */
export const LocalExtConfig = () => {
  return {
    app: {
      name: localStorage.getItem('ext_app_name') || import.meta.env.VITE_EXT_APPNAME || ''
    },
    request: {
      appID: localStorage.getItem('ext_app_id') || import.meta.env.VITE_EXT_REQUEST_APPID || '', // 请求APPID
      signSecret: localStorage.getItem('ext_sign_secret') || import.meta.env.VITE_EXT_REQUEST_SIGNSECRET || '', // 请求签名密钥
      encryptSecret: localStorage.getItem('ext_encrypt_secret') || import.meta.env.VITE_EXT_REQUEST_ENCRYPTSECRET || '' // 请求加密密钥
    },
    router: {
      loginId: localStorage.getItem('ext_login_id') || import.meta.env.VITE_EXT_ROUTER_LOGINID || 'index' // 登录路径ID
    }
  }
}
export default ExtConfig
