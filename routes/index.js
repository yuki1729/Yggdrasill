var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

router.get('/', function(req, res, next) {
  var query = 'SELECT *, DATE_FORMAT(created_on, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_on FROM something';
  connection.query(query, function(err, rows) {
    res.render('index', {
      taskList: rows
    });
  });
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
  console.log("-------------------post-------------------")
  console.log(req.body)
  var query =
    'INSERT INTO something (subject, start_date, finish_date, created_by_user_id, created_on, primary_limit,memo) VALUES ('
    + subject
    + start_date + ','
    + finish_date + ','
    + '3, '
    + 'NOW(), '
    + finish_date
    + InputTextarea
    + ')';

  connection.query(query, function(err, rows) {
    res.redirect('/');
  });
});

module.exports = router;
