var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');


router.get('/', function(req, res) {
  res.render('logout');
  session.destroy(req.session.user_id, function(err) {
    req.session.destroy();
    console.log('deleted sesstion');
    res.redirect('/');
    return;
  });
});


exports.logout = require('./logout');

/*

router.get('/', function(req, res, next) {
  res.render('login',
  { title: 'login',
    task:'task'
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});
*/

module.exports = router;
