var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  // 割当先ユーザーIDを取得
    res.render('vuetest', {

    });

  // console.log(sqlQuery.sql);
});

router.get('/getquery', function(req, res, next) {
  var query = 'SELECT *, DATE_FORMAT(start_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS start_date, DATE_FORMAT(finish_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS finish_date FROM something inner join assignment_relation on something.id = assignment_relation.something_id';
  getQuery = connection.query(query, function(err, rows) {
    res.send(rows);

  //    console.dir(rows);
  //    res.render('vuetest', {
  //          });
      });
});


module.exports = router;
exports.login = require('./vuetest');
