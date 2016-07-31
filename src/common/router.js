/**
 * Created by lizude on 16/7/30.
 */
'use strict';
let run = require('./run');

module.exports = function(app) {

  //首页
  app.get('/', run(ctrls.index.get));


  app.get('/upload/files', run(ctrls.upload.get));
  app.post('/upload', run(ctrls.upload.upload));

  app.post('/upload/check', run(ctrls.upload.checkExisting));

  app.post('/delete/file', run(ctrls.upload.delete));

  //404
  app.all('*', function(req, res) {
    res.status(404).end();
  });
};