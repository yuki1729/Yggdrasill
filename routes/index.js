var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ExpressEEE' });
  console.log("title")
});

router.post('/', function(req, res, next) {
  var title = req.body.title;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log("post")
  var query = 'INSERT INTO boards (title, created_at) VALUES ("' + title + '", ' + '"' + createdAt + '")';
  connection.query(query, function(err, rows) {
    res.redirect('/');
  });
});

module.exports = router;
