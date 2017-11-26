var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ


// 関係者アップデートページを表示
router.get('/', function(req, res, next) {
  console.log('concerned_edit');
  res.render('concerned_edit');
});

// 関係者アップデートページを表示
router.get('/edit/:id', function(req, res, next) {
  console.log('詳細検索用ID:', req.params.id);
  var query = 'SELECT id, partner_user_id, nickname, at_name FROM concerned where id = ' + req.params.id + ';'
  sqlQuery = connection.query(query, function(err, rows) {
    console.dir(rows);
    res.send(rows);
  });
});

// 関係者をアップデート
router.post('/update/:id', function(req, res, next) {
  console.log("アップデート内容", req.params.id);
  console.log(req.body);
  var updateValue = {
    nickname: req.body.nickname,
    partner_user_id: req.body.partner_user_id,
    at_name: req.body.at_name
  }
  var query = connection.query('UPDATE `concerned` SET ? WHERE id = ?', [updateValue,req.params.id], function (error, results, fields) {
  if (error) throw error;
  });
});

// router.post('/concernedList/delete', function(req, res, next) {
//   console.log(req.body.concerned_id)
//   var concern_id = req.body.concerned_id
//   var query = connection.query('DELETE `concerned` WHERE id = ?', concerned_id, function (error, results, fields) {
//   if (error) throw error;
//   });
// });

module.exports = router;
exports.concerned_edit = require('./concerned_edit');