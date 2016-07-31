/**
 * Created by lizude on 16/7/30.
 */
'use strict';

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

_.render = function(htmlFile, options) {
  options = options || {};

  return {
    type: CONSTANT.RENDER_FILE,
    htmlFile: htmlFile,
    options: options
  };
};