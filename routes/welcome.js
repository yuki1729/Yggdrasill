var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

router.post('/', function(req, res, next) {
  var register_username = '"' + req.body.username + '", ';
  var register_password = '"' + req.body.password + '", ';
  var register_mail = '"' + req.body.mail + '", ';
  console.log("-------------------post-------------------")
  console.log(req.body)
  var query =
    'INSERT INTO something (user_name, password, mail) VALUES ('
    + register_username
    + register_password
    + '"test@mail.com", '
    + ')';

  connection.query(query, function(err, rows) {
    res.redirect('/');
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome',
  { title: 'welcome',
    task:'task'
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});

module.exports = router;
