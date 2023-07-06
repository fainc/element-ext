/*
OSS POST 表单上传
参考文档：https://help.aliyun.com/document_detail/31988.html?spm=a2c4g.31977.0.0
 */

import Request from '../../request/index.js'

// todo
export const OssPost = (endpoint, file, objectKey, acl, accessKeyID, policy, signature, overwrite) => {
  const form = new FormData()
  form.append('OSSAccessKeyId', accessKeyID)
  form.append('policy', policy)
  form.append('Signature', signature)
  form.append('x-oss-forbid-overwrite', overwrite)
  form.append('key', objectKey)
  form.append('success_action_status', '200')
  form.append('file', file)
  return Request.Post(endpoint, form, { headers: { 'x-oss-object-acl': acl, originalHeader: true, originalResponse: true } })
}

// todo
export const OssPostGroup = (endpoint, group = []) => {
  const promise = []
  group.forEach(item => {
    const { file, objectKey, acl, accessKeyID, policy, signature, overwrite } = item
    promise.push(OssPost(endpoint, file, objectKey, acl, accessKeyID, policy, signature, overwrite))
  })
  Promise.allSettled(promise).then((values) => {
    console.log(values)
  })
}
