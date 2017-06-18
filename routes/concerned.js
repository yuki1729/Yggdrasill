var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

/* GETリクエストを受けた時の処理 */

router.get('/', function(req, res, next) {
  res.render('concerned',
  { title: '関係者のメンション設定',
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});

router.post('/', function(req, res, next) {
  var nickname = '"' + req.body.nickname + '"';
  // var mension = '"' + req.body.mension + '"';
  console.log("----------concernd post-------------------")
  console.log(req.body)
  var query =
    'INSERT INTO concerned (nickname,self_user_id,partner_user_id) VALUES ('
    + nickname
    + 2
    + 2
    + ')';
    var post_value = {
      nickname: req.body.nickname,
      self_user_id: 2,
      partner_user_id: 2
    };


  var query = connection.query('INSERT INTO concerned SET ?', post_value, function(err, rows) {
    // res.redirect('/concerned');
  });
});


module.exports = router;
exports.concerned = require('./concerned');
