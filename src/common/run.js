/**
 * Created by lizude on 16/7/30.
 */
'use strict';
let co = require('co');
let util = require('util');

module.exports = function(func) {
  return function(req, res) {
    //log
    util.log(req.method, req.url);

    co(function*() {
      let data = yield func(req, res);
      return data;
    }).then(function(data) {
      if(data.type === CONSTANT.RENDER_FILE) {
        //页面渲染
        res.render(data.htmlFile, data.options);
      } else {
        res.send({
          code: 0,
          data: data
        });
      }
    }, function(err) {
      console.error(err);
      res.send({
        code: err.code || 1,
        msg: err.msg || '未知错误'
      })
    });
  };
};