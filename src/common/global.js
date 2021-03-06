/**
 * Created by lizude on 16/7/30.
 */
//全局对象
'use strict';

global.config = require('./config');
global.co = require('co');
global.CONSTANT = require('./constant');
global._ = require('lodash');

require('./func');

// 全局错误
global.errors = require('./errors');
global.Exception = function (code, msg) {
  this.code = code;
  this.msg = msg || errors[code];
  this.stack = new Error(this.code + ': ' + this.msg).stack;
};

//保存所有链接用户信息,以token为键值
global.users = {};

global.ctrls = require('./controller');