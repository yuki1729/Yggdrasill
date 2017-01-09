var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ
var crypto = require('crypto');

router.post('/', function(req, res, next) {
  var register_username = req.body.username;
  var register_mail = req.body.mail;
  var register_password = req.body.password;
  var getUserIdQuery = 'SELECT id FROM mydb.user WHERE user_name = "' + register_username + '" LIMIT 1';
  connection.query(getUserIdQuery, function(err, result) {
    var sessionUserId =  result[0].id;
    req.session.user_id = sessionUserId;
    console.log("---sessionUserId---")
    console.dir(result);
    console.log(result[0].id);
    var emailExistsQuery = 'SELECT * FROM mydb.user WHERE id = "' + sessionUserId + '" LIMIT 1';
    connection.query(emailExistsQuery, function(err, mail) {
      var emailExists = mail.length === 1;
      if (emailExists) {
        res.redirect('/');

      } else {
  //      connection.query(query, function(err, rows) {
  //      });
      res.render('login', {
        title: 'ログイン',
        emailExists: 'セッションユーザー ID' + sessionUserId + 'です'
      });

      }
    });
  });



//register_passwordの暗号化
  var cipher = crypto.createCipher('aes-256-cbc',register_password);
  var crypto_password = cipher.update(register_password, 'utf8', 'hex');
  crypto_password +=  cipher.final('hex') ;

 console.log('passwordtest' + crypto_password);


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



  router.get('/', function(req, res, next) {
    res.render('login', {
      title: 'ログイン'
    });
  });




});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',
  { title: 'login',
    task:'task'
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});


module.exports = router;
exports.login = require('./login');
