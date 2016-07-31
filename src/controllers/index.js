/**
 * Created by lizude on 16/7/30.
 */
'use strict';
let fs = require('fs');
let path = require('path');

let Ctrl = function() {};

let that = module.exports = new Ctrl();

Ctrl.prototype.get = function*(req, res) {
  let files = fs.readdirSync(config.uploadDir);

  return _.render('index', {files: files || []});
};