/**
 * Created by lizude on 16/7/30.
 */
'use strict';

//驼峰
_.toCamel = function(str) {
  str = str || '';
  let arr = str.split('_');
  for(let i = 1; i < arr.length; i++) {
    if(arr[i]) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
    }
  }

  return arr.join('');
};

//渲染页面
_.render = function(htmlFile, options) {
  options = options || {};

  return {
    type: CONSTANT.RENDER_FILE,
    htmlFile: htmlFile,
    options: options
  };
};

//创建token
_.createToken = function(len) {
  len = len || 32;  //默认长度为32位
  let seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let seedLen = seed.length - 1;
  let ret = '';
  for(let i = 0; i < len; i++) {
    ret += seed[parseInt(seedLen * Math.random())];
  }

  return ret;
};