/**
 * Created by lizude on 16/7/30.
 */
'use strict';

// 引用
let fs = require('fs');
let path = require('path');

// 加载所有模型
let ctrls = {};
let dir = fs.readdirSync(__dirname + '/../controllers');
for (let i = 0; i < dir.length; i++) {
  if (path.extname(dir[i]) !== '.js') continue;
  ctrls[_.toCamel(path.basename(dir[i], '.js'))] = require(__dirname + '/../controllers/' + dir[i]);
}

// 导出
module.exports = ctrls;