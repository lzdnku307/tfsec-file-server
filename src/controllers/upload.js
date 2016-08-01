/**
 * Created by lizude on 16/7/30.
 */
'use strict';
let formidable = require('formidable');
let thunkify = require('thunkify-wrap');
let fs = require('fs');
let path = require('path');

let Ctrl = function() {};
let that = module.exports = new Ctrl();

/*
* 获取已上传文件
* param all   boolean
 */
Ctrl.prototype.get = function* (req,res) {
  if(parseInt(req.query.all)) {
    return fs.readdirSync(config.uploadDir);
  } else {
    return req.session.files || [];
  }
};

//上传文件
Ctrl.prototype.upload = function* (req, res) {
  let ret = 'ok';
  try {
    let form = new formidable.IncomingForm();
    let recv = thunkify.genify(form.parse, form);
    let result = yield recv(req);

    if(!result || result.length !== 2) {
      throw '上传失败!';
    }

    let fileName = result[1].Filedata.name;
    let tmpFile = result[1].Filedata.path;

    //将文件拷贝到指定目录
    let realFile = path.join(config.uploadDir, fileName);
    fs.renameSync(tmpFile, realFile);

    //将用户上传的文件保存到对应的session中
    req.session.files = req.session.files || [];
    let i = 0;
    for(; i < req.session.files.length; i++) {
      if(fileName === req.session.files[i]) {
        break;
      }
    }
    if(i === req.session.files.length) {
      req.session.files.push(fileName);
    }

    ret = '上传成功!';
  } catch(e) {
    res.status(404);
    ret = e;
  }

  return ret;
};

//查看是否有相同的文件
Ctrl.prototype.checkExisting = function* (req, res) {
  let filename = req.body.filename;
  let ret = {
    type: CONSTANT.SEND_NOT_JSON
  };
  if(!filename) {
    ret.data = CONSTANT.UPLOAD_STATUS.FILE_NOT_EXSIST;
    return ret;
  };
  filename = filename.toLowerCase();

  //读取下载目录下所有文件
  let dirs = fs.readdirSync(config.uploadDir);
  while(dirs.length) {
    if(dirs.pop().toLowerCase() === filename) {
      ret.data = CONSTANT.UPLOAD_STATUS.FILE_EXSIST;
      return ret;
    }
  }
  ret.data = CONSTANT.UPLOAD_STATUS.FILE_NOT_EXSIST;
  return ret;
};

Ctrl.prototype.delete = function*(req, res) {
  let filename = req.body.filename;
  if(!filename) throw new Exception(1001);

  //查找文件
  let filePath = path.join(config.uploadDir, filename);

  try {
    fs.unlinkSync(filePath);
    let uploadedFiles = req.session.files || [];
    for(let i = 0; i < uploadedFiles.length; i ++) {
      if(uploadedFiles[i] === filename) {
        uploadedFiles.splice(i, 1);
        break;
      }
    }
    req.session.files = uploadedFiles;
    return 'ok';
  } catch(e) {
    throw new Exception(1002);
  }
};