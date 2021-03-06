/**
 * Created by lizude on 16/7/30.
 */
//配置文件
'use strict';

module.exports = {
  //服务启动端口
  port: 8080,

  //上传文件保存目录
  uploadDir: '/Users/lizude/mine/tfsec-file-server/upload',

  //session
  session: {
    expired: 1 * 60 * 60 * 1000 //超时设置(毫秒)
  },
};