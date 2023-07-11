import { JSEncrypt } from 'jsencrypt'
import { sm2 } from 'sm-crypto'
// 公钥加密

// 公钥
export const crypto = (data, m) => {
  console.log(m)
  // 将请求数据对象拼接成字符串
  let str = ''
  if (Object.keys(data).length > 0) {
    Object.keys(data).forEach(function (key) {
      str = str + key + '=' + data[key] + '&'
    })
    str = str.substring(0, str.length - 1)
  } else {
    str = ''
  }
  if (m === 'ras') {
    const pubKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAucpL9TRMdlKOc2oFZCSPpKfwGBbmCDg9F1DOwg9F9wzaTltL/7XLsq0wa+AX3Uti+yCNhO0Bdvrk5OFgZWSVAcwa/NJ/WWycwmbKoUmL9DeAcCOp+I4qWtPig4yY/4dn3MOM0QK+b27N2d+4ZBezbJrhm7EfcQOzX/A733QlY68lWE8ypNOZlJtrJeojaCLr/xU1JeC/tCdISlc3coDQ+Ye9UKDrgvIKNGmBw1CsFQ4j8sb5fTlgPAHFSr2MKDDGoI9gxx4mSPTrZVJv8Wp/Ala4aAn2CHfsfXQwX6IkW9zgb3gEhSPZR653uTTDsE5HZbltTK1AJLwKu8DYYnwZXQIDAQAB'
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(pubKey)
    return encrypt.encrypt(str)
  } else {
    // 获取sm2密钥对
    const keypair = sm2.generateKeyPairHex()
    const publicKey = keypair.publicKey // 公钥
    // const privateKey = keypair.privateKey // 私钥
    // 加密结果
    const encryptData = sm2.doEncrypt(str, publicKey)
    // 加密后的密文前需要添加04，后端才能正常解密 (不添加04，后端处理也可以)
    const encrypt = '04' + encryptData
    // console.log(sm2.doDecrypt(encryptData, privateKey, cipherMode)) 解密结果
    return encrypt
  }
}
// 私钥解密

// 私钥
// const privKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5ykv1NEx2Uo5zagVkJI+kp/AYFuYIOD0XUM7CD0X3DNpOW0v/tcuyrTBr4BfdS2L7II2E7QF2+uTk4WBlZJUBzBr80n9ZbJzCZsqhSYv0N4BwI6n4jipa0+KDjJj/h2fcw4zRAr5vbs3Z37hkF7NsmuGbsR9xA7Nf8DvfdCVjryVYTzKk05mUm2sl6iNoIuv/FTUl4L+0J0hKVzdygND5h71QoOuC8go0aYHDUKwVDiPyxvl9OWA8AcVKvYwoMMagj2DHHiZI9OtlUm/xan8CVrhoCfYId+x9dDBfoiRb3OBveASFI9lHrne5NMOwTkdluW1MrUAkvAq7wNhifBldAgMBAAECggEBALm6VKKkjIeAUi1oYElTD1HQHIFIat7usYucWYS/1fZ5n8bTF69iImbVIWHF3LV5hlJ7oV2vvFYfzDBOaZoSqa7pRlVVbL+Nh0wDjC8eIc2aqkfwLxttq0OvK3LMW6qexyJ3Tk8nSg6Fmz1hm6hb1R8N2dlVgJPu2iNfOctRBYuWt8B/Ff3I1qvCYL9Sd0rYZHVUrt5ZghXTslW8fbpGeixr+Fv1Hwtl51ieTiwho2DrCEuagor7SQ++o8/Y/sBQ9IsDo0RJbCmvHEIjM6WtDYN+yap5C2EWLlrGMgwPEajjjwzsdETyQoO/84wgAsKVkVfW7QOWZWpLVXPxzgMcdCECgYEA5devHTv+wgcqpU3U5TFzN0tajthObTZNkLYCH3nb/+JwHp9XXTQv72tc62iV72S029RUU79lbQkcpO5RQneM2cMx3TcA/S+VMRk2/c68kYEVdxU5csKgxzwN13PnelxjBITNTfyb+4H3FcIC3Mt+FT9PzIpKJ5KADhUXej+yjVkCgYEAzu8tUIHPD59xM19eIJPxq89GxJkGIo6VTs5OBe1lsHaETdO55oV5pRjfe90en19jOri2fykr7V9jEyLZwhI0ONeg3M6ClvhHvWMc33fFNTmXEzPFQX9QTMCvPRQw3fnILGbJY9tZIXpCuhlZJTpU4htwdXdShzWeo/8cXZzUF6UCgYBu1Ixaen2kLjSANYG9axT1yt5GF0PqIc9RQpLPfsF5KEWMXqWQCgQ7XPgXg/0YzOTxQ/fN0nMkGsq3NTv14xQGRbubwlQ1wmYcoN4FkVUYjLg/Dfr/vZ4ttGWwSPGL7VTJ7wfY3UCSDN+KnF0o/u8za64dIWoUnu4k3ELP7js5MQKBgC2uCJ/D9/Rn6vI/NCUW43tcxy9w5DTOqtD5o6mVTSRWFUCk412qyz6RrgvGtRLTWLFGwypw6Tx+GP3JbK51nEeL+fukLpmq9xMshNwjsUndi6b2f63Er/Ixer2N7nehwvliO0Sq0BMezQoNvGsGZGSBUCLuEy67vGhRUW6sxvjtAoGBAJEnUwW8aMqb0I1Q+zJcboxreHV/1EkdhPZNCwp9fXtA1ThNdzYrHoDBuZldVmS+F5hf0d4sPlCA7JqFkvfOMDdvRXYsx9hbg3v5w3FQ/8cpNMQx+iotU+M5X11s7h2qN6uZwvrXDTmbG/p9UDp6GMpOV0bIFyL0Vo61VAJKAAKj'
//
// function decrypt (str) {
//   const encrypt = new JSEncrypt()
//   encrypt.setPrivateKey(privKey)
//   return encrypt.decrypt(str)
// }
