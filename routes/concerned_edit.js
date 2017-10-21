var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ


// 関係者アップデートページを表示
router.get('/', function(req, res, next) {
  res.render('concerned_edit');
});

// 関係者アップデートページを表示
router.get('/:id', function(req, res, next) {
  var query = 'SELECT id, nickname, at_name FROM concerned where self_user_id = ' + req.session.user_id + ';'
  sqlQuery = connection.query(query, function(err, rows) {
    console.dir(rows);
    res.send(rows);
  });
});

// 関係者をアップデート
router.post('/concernedList/edit/:id', function(req, res, next) {
  console.log("req.body");
  console.log(req.body);
  var updateValue = {
    nickname: req.body.nickname,
    partner_usr_id: req.body.partner_use_id,
    at_name: req.body.at_name
  }
  var query = connection.query('UPDATE `concerned` SET ? WHERE id = ?', [updateValue,1], function (error, results, fields) {
  if (error) throw error;
  });
});

router.post('/concernedList/delete', function(req, res, next) {
  console.log(req.body.concerned_id)
  var concern_id = req.body.concerned_id
  var query = connection.query('DELETE `concerned` WHERE id = ?', concerned_id, function (error, results, fields) {
  if (error) throw error;
  });
});

module.exports = router;
exports.concerned = require('./concerned');