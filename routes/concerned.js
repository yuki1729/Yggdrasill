var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

/* GETリクエストを受けた時の処理 */

// router.get('/', function(req, res, next) {
//   // 割当先ユーザーIDを取得
//   var query = 'SELECT *, DATE_FORMAT(start_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS start_date, DATE_FORMAT(finish_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS finish_date FROM something inner join assignment_relation on something.id = assignment_relation.something_id';
//   sqlQuery = connection.query(query, function(err, rows) {
//     //完了状態のタスクを下方にソート // 順番もDATE_FORMATもangularjsにそのままの値渡してそちらで処理したほうが良いかも
//     rows.sort(function(a,b){
//       if(a.done<b.done) return -1;
//       if(a.done>b.done) return 1;
//     }
//     res.render('concerned', {
//       title: '関係者のメンション設定',
//       taskList: rows
//     })
//   });
// });

router.get('/', function(req, res, next) {
  // 割当先ユーザーIDを取得
  var query = 'SELECT *, DATE_FORMAT(start_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS start_date, DATE_FORMAT(finish_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS finish_date FROM something inner join assignment_relation on something.id = assignment_relation.something_id';
  sqlQuery = connection.query(query, function(err, rows) {
    //完了状態のタスクを下方にソート // 順番もDATE_FORMATもangularjsにそのままの値渡してそちらで処理したほうが良いかも
    rows.sort(function(a,b){
      if(a.done<b.done) return -1;
      if(a.done>b.done) return 1;
    })
    res.render('concerned', {
      title: '関係者のメンション設定',
      concernList: rows
    });
  });
  // console.log(sqlQuery.sql);
});

router.post('/', function(req, res, next) {
  var nickname = '"' + req.body.nickname + '"';
  var mension = '"' + req.body.mension + '"';
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
      at_name: req.body.mension,
      self_user_id: 2,
      partner_user_id: 2
    };


  var query = connection.query('INSERT INTO concerned SET ?', post_value, function(err, rows) {
    res.redirect('/concerned');
  });
});

// test

module.exports = router;
exports.concerned = require('./concerned');
