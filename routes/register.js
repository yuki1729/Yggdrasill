var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ
var crypto = require('crypto');

router.post('/', function(req, res, next) {
  var register_username = req.body.username;
  var register_password = req.body.password;
//register_passwordの暗号化
  var cipher = crypto.createCipher('aes-256-cbc',register_password);
  var crypto_password = cipher.update(register_password, 'utf8', 'hex');
  crypto_password +=  cipher.final('hex') ;

 console.log('passwordtest' + crypto_password);

  var register_mail = req.body.mail;
  console.log("-------------------post-------------------")
  console.log(req.body)
  var query =
    'INSERT INTO user (user_name, password, mail, created_at) VALUES ('
    + '"' + register_username + '" , '
    + '"' + crypto_password + '" , '
    + '"' + register_mail + '" , '
    + 'NOW() '
    + ')';

//MySQLで通ったSQL文
//SELECT * FROM mydb.user;
//INSERT INTO user (user_name, password, mail, created_at) VALUES (
//'register_username' , 'crypto_password' , 'testtest@mail.com' , NOW());


  connection.query(query, function(err, rows) {
    res.redirect('/register');
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register',
  { title: 'register',
    task:'task'
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});

module.exports = router;
exports.register = require('./register');
