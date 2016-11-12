var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ 


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
  // var query = 'INSERT INTO something (subject, created_by_user_id, primary_limit) VALUES ("' + title + "', 00000000001, cast('2009-08-03' as date))";
  var query =
    'INSERT INTO something (subject, start_date, finish_date, created_by_user_id, created_on, primary_limit) VALUES ('
    + subject
    + start_date + ','
    + finish_date + ','
    + '3, '
    + 'NOW(), '
    + finish_date
    + ')';

  connection.query(query, function(err, rows) {
    res.redirect('/');
  });
});

/* GET home page. test */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log("title")
});

connection.query('SELECT * FROM mydb.something;', (err,rows,fields) =>{
  if(err)throw err;
  console.log('The solution is:', rows);
});

router.get('/', function(req, res, next) {
  var query = 'SELECT *';
  connection.query(query, function(err, rows) {
    res.render('index', {
      title: 'はじめてのNode.js',
      boardList: rows
    });
  });
});

module.exports = router;
