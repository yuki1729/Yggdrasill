var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

router.post('/', function(req, res, next) {
  var register_username = req.body.register_username;
  var register_password = req.body.register_password;
  console.log("-------------------post1111111111111111")
  console.log(req.body)
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
