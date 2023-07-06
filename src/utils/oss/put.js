import Request from '../../request/index.js'

/*
OSS 签名PUT直传
参考文档 https://help.aliyun.com/document_detail/31952.html?spm=a2c4g.375302.0.0
 */

export const OssPutSignedURL = (signedUrl, file, acl, contentType, md5, overwrite) => {
  return Request.Put(signedUrl, file, { headers: { 'x-oss-object-acl': acl, 'Content-Type': contentType, 'Content-MD5': md5, 'x-oss-forbid-overwrite': overwrite }, originalHeader: true, originalResponse: true })
}

// Oss 多文件并发Put上传 todo values 结果处理
export const OssPutSignedURLGroup = (group = []) => {
  const promise = []
  group.forEach(item => {
    const { signedUrl, file, acl, contentType, md5, overwrite } = item
    promise.push(OssPutSignedURL(signedUrl, file, acl, contentType, md5, overwrite))
  })
  Promise.allSettled(promise).then((values) => {
    console.log(values)
  })
}
