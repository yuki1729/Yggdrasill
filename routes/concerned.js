var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('concerned',
  { title: '関係者のメンション設定',
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});

router.get('/concernedList', function(req, res, next) {
  console.log("start concernedList");
  var query = 'SELECT id, nickname, at_name FROM concerned where self_user_id = ' + req.session.user_id + ';'
  sqlQuery = connection.query(query, function(err, rows) {
    console.dir(rows);
    res.send(rows);
  });

});

module.exports = router;
exports.concerned = require('./concerned');