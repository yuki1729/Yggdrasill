var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ


router.get('/', function(req, res, next) {
  res.render('setting',
  { title: 'setting',
    task:'setting',
    test: 'hello',
    user_id: req.session.user_id,
    user_name: req.register_username,

  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});


module.exports = router;
