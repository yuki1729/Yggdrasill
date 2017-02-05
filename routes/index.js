var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

router.get('/', function(req, res, next) {
  var query = 'SELECT *, DATE_FORMAT(start_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS start_date, DATE_FORMAT(finish_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS finish_date FROM something';
  console.log(query);
  connection.query(query, function(err, rows) {
    //完了状態のタスクを下方にソート
    rows.sort(function(a,b){
      if(a.done<b.done) return -1;
      if(a.done>b.done) return 1;
    })
    res.render('index', {
      taskList: rows
    });
  });
  console.log("index.html page session user id: " + req.session.user_id);
});

router.post('/', function(req, res, next) {
  var subject = '"' + req.body.title + '", ';
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  // var m = moment(req.body.primary_limit,"YYYY/MM/DD HH:mm");
  var m1 = moment(req.body.start_date,"YYYY/MM/DD HH:mm");
  var m2 = moment(req.body.finish_date,"YYYY/MM/DD HH:mm");
  // var due_date =  '"' + m.format('YYYY-MM-DD HH:mm:ss') + '" ';
  var start_date =  '"' + m1.format('YYYY-MM-DD HH:mm:ss') + '" ';
  var finish_date =  '"' + m2.format('YYYY-MM-DD HH:mm:ss') + '" ';
  var memo = '"' + req.body.memo + '"';
  console.log("-------------------post-------------------")
  console.log(req.body)
  var query =
    'INSERT INTO something (subject, start_date, finish_date, created_by_user_id, created_on, primary_limit,memo) VALUES ('
    + subject
    + start_date + ','
    + finish_date + ','
    + '3, '
    + 'NOW(), '
    + finish_date + ','
    + memo
    + ')';
  // var listValue ={
  //   subject : subject,
  //   start_date :
  // }

    console.log(query);
  // assignment_relationテーブルへの登録
  connection.query(query, function(err, result) {
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
    console.log(query.sql);
    });

    res.redirect('/');
  });
});

//タスクの完了状態を変更
router.post('/update', function(req, res, next) {
  console.log("----------post----------");
  console.log(req.body.id);
  var query = "UPDATE `something` SET `done`='" + req.body.done +"' WHERE `id`='" + req.body.id +"'";
  connection.query(query, function(err, rows) {
    console.log("----------task done database post----------");
  });

});

module.exports = router;
