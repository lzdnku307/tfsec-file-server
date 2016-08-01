/**
 * Created by lizude on 16/7/30.
 */
'use strict';

let express = require('express');
let ejs = require('ejs');
let path = require('path');
let session = require('express-session');

let router = require('./router');

require('./global');

let app = express();

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(require('body-parser').urlencoded({extended: false}));
app.use(require('cookie-parser')());
app.use(express.static(__dirname + '/../static/'));
app.use(express.static(config.uploadDir));

app.use(session({ secret: 'tfsec-file-server', cookie: { maxAge: config.session.expired }}));

router(app);

app.listen(config.port, function() {
  console.log('server started at:', config.port);
});

// 错误
process.on('uncaughtException', function (err) {
  console.error('Global:');
  console.error(err);
  process.exit(0);
});