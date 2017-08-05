var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

router.get('/', function(req, res, next) {
  res.render('test',
  { title: 'test',
    task:'test'
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});



module.exports = router;
