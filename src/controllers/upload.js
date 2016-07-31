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

Ctrl.prototype.get = function*(req,res) {
  return fs.readdirSync(config.uploadDir);
};

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
  if(!filename) return CONSTANT.UPLOAD_STATUS.FILE_NOT_EXSIST;
  filename = filename.toLowerCase();

  //读取下载目录下所有文件
  let dirs = fs.readdirSync(config.uploadDir);
  while(dirs.length) {
    if(dirs.pop().toLowerCase() === filename) {
      return CONSTANT.UPLOAD_STATUS.FILE_EXSIST;
    }
  }
  return CONSTANT.UPLOAD_STATUS.FILE_NOT_EXSIST;
};

Ctrl.prototype.delete = function*(req, res) {
  let filename = req.body.filename;
  if(!filename) throw new Exception(1001);

  //查找文件
  let filePath = path.join(config.uploadDir, filename);

  try {
    fs.unlinkSync(filePath);
    return 'ok';
  } catch(e) {
    throw new Exception(1002);
  }
};