var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

router.get('/', function(req, res, next) {
  var query = 'SELECT *, DATE_FORMAT(start_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS start_date, DATE_FORMAT(finish_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS finish_date FROM something';
  connection.query(query, function(err, rows) {
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
    'INSERT INTO something (subject, start_date, finish_date, created_by_user_id, created_on, primary_limit,memo, done) VALUES ('
    + subject
    + start_date + ','
    + finish_date + ','
    + '3, '
    + 'NOW(), '
    + finish_date + ','
    + memo + ','
    + '0'
    + ')';

  connection.query(query, function(err, rows) {
    res.redirect('/');
  });
});

router.post('/update', function(req, res, next) {
  console.log("----------post----------");
  console.log(req.body.id);
  var query = "UPDATE `something` SET `done`='" + req.body.done +"' WHERE `id`='" + req.body.id +"'";
  connection.query(query, function(err, rows) {
    console.log("----------task done database post----------");
  });

});

module.exports = router;
