import { JSEncrypt } from 'jsencrypt'
import { sm2 } from 'sm-crypto'
import ExtConfig from '../config/index.js'

// 公钥加密
const encrypt = (data, m) => {
  const str = JSON.stringify(data)
  if (JSON.stringify(data) === '{}') {
    return {}
  }
  if (m === 'rsa') {
    const pubKey = ExtConfig.request.publicKeyRsa
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(pubKey)
    console.log(decrypt(encrypt.encrypt(str), 'rsa'))
    return { data: encrypt.encrypt(str) }
  }
  if (m === 'sm2') {
    const publicKey = ExtConfig.request.publicKeySm2 // 公钥
    const encryptData = sm2.doEncrypt(str, publicKey)
    // 加密后的密文前需要添加04，后端才能正常解密 (不添加04，后端处理也可以)
    console.log(decrypt('04' + encryptData, 'sm2'))
    return { data: '04' + encryptData }
  }
  return data
}

// 私钥解密
const decrypt = (str, m) => {
  if (m === 'rsa') {
    const privateKey = ExtConfig.request.privateKeyRsa
    const encrypt = new JSEncrypt()
    encrypt.setPrivateKey(privateKey)
    return JSON.parse(encrypt.decrypt(str))
  }
  if (m === 'sm2') {
    const privateKey = ExtConfig.request.privateKeySm2
    // 解密结果
    const doDecrypt = sm2.doDecrypt(str.substring(2), privateKey)
    // 解密后类型转换
    const objData = JSON.parse(doDecrypt)
    return objData
  }
}
const crypto = {
  encrypt,
  decrypt
}
export default crypto
