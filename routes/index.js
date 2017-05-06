var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

router.get('/', function(req, res, next) {
  // 割当先ユーザーIDを取得
  var query = 'SELECT *, DATE_FORMAT(start_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS start_date, DATE_FORMAT(finish_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS finish_date FROM something inner join assignment_relation on something.id = assignment_relation.something_id';
  sqlQuery = connection.query(query, function(err, rows) {
    //完了状態のタスクを下方にソート // 順番もDATE_FORMATもangularjsにそのままの値渡してそちらで処理したほうが良いかも
    rows.sort(function(a,b){
      if(a.done<b.done) return -1;
      if(a.done>b.done) return 1;
    })
    res.render('index', {
      taskList: rows
    });
  });
  // console.log(sqlQuery.sql);
});

router.post('/', function(req, res, next) {
  console.log("-------------------post-------------------")
  console.log(req.body)
  var m1 = moment(req.body.start_date,"YYYY/MM/DD HH:mm");
  var m2 = moment(req.body.finish_date,"YYYY/MM/DD HH:mm");

  var listValue = {
    subject: req.body.title,
    start_date: m1.format('YYYY-MM-DD HH:mm:ss'),
    finish_date: m2.format('YYYY-MM-DD HH:mm:ss'),
    created_by_user_id: req.session.user_id,
    created_on: 'NOW()',
    primary_limit: m2.format('YYYY-MM-DD HH:mm:ss'),
    memo: req.body.memo
  }
   //SQL文へ文字列のNOWを投げる方法がわからない
    console.log(listValue);
  // assignment_relationテーブルへの登録
  var query = connection.query('INSERT INTO something SET ?', listValue, function(error, result,fields) {
    // console.log(query.sql);
    if (error) throw error;
    // Neat!

  var post_value = {
    assigned_by_user: req.session.user_id,
    something_id: result.insertId,
    assigned_to_user: Number(req.body.assigned_to_user),
    time_assigned_by: 'NOW()'
    };

    console.log(post_value);
    var query = connection.query('INSERT INTO assignment_relation SET ?', post_value, function (error, results, fields) {
    if (error) throw error;
    // Neat!
    });
    console.log(query.sql);

    res.redirect('/');
  });
  console.log(query.sql);

});

// タスクを変更
router.post('/update', function(req, res, next) {
  var m1 = moment(req.body.start_date,"YYYY/MM/DD HH:mm");
  var m2 = moment(req.body.finish_date,"YYYY/MM/DD HH:mm");
  var updateValue = {
    subject: req.body.subject,
    start_date: m1.format('YYYY-MM-DD HH:mm:ss'),
    finish_date: m2.format('YYYY-MM-DD HH:mm:ss'),
    primary_limit: m2.format('YYYY-MM-DD HH:mm:ss'),
    memo: req.body.memo
  }
  console.log("updateValue");
  console.log(updateValue);
  var query = connection.query('UPDATE `something` SET ? WHERE id = ?', [updateValue,req.body.id], function (error, results, fields) {
  if (error) throw error;
  console.log("query.sql");
  console.log(query.sql);
  // console.log(error);
  // Neat!
  });

  //
  // var query = "UPDATE `something` SET `subject`='" + req.body.subject +"' WHERE `id`='" + req.body.id +"'";
  // connection.query(query, function(err, rows) {
  //
  // });

});

router.post('/changeSomethingState', function(req, res, next) {
  console.log("----------post----------");
  console.log(req.body.id);
  var query = "UPDATE `something` SET `done`='" + req.body.done +"' WHERE `id`='" + req.body.id +"'";
  connection.query(query, function(err, rows) {
    console.log("----------task done database post----------");
  });

});

module.exports = router;
