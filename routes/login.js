var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ
var crypto = require('crypto');

router.post('/', function(req, res, next) {
  var register_username = req.body.username;
  var register_mail = req.body.mail;
  var register_password = req.body.password;

//register_passwordの暗号化。ソルトはまだしてないので後でやる
　var cipher = crypto.createCipher('aes-256-cbc',register_password);
  var crypto_password = cipher.update(register_password, 'utf8', 'hex');
  crypto_password +=  cipher.final('hex') ;

console.log(crypto_password + '*******************');

  var query = 'SELECT user_name FROM mydb.user WHERE user_name = "' + register_username + '" AND password = "' + crypto_password + '" LIMIT 1';

/*MySQLで動くSQL文
SELECT * FROM mydb.user;
SELECT user_name FROM mydb.user WHERE user_name = 'igaki' AND password =  '7e953ce6ce197ab31f16facdc3f403f4' LIMIT 1;
*/

  req.session.user_id = register_username;
  console.log("session user id: " + req.session.user_id);

connection.query(query, function(err, rows) {
  var userId = rows.length? rows[0].user_id: false;
  if (userId) {
    req.session.user_id = userId;
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'ログイン',
      noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
    });
  }
 });




  router.get('/', function(req, res, next) {
    if(req.session.user_id){
      res.redirect('/');
    }else {
    res.render('login', {
      title: 'ログイン'
    });
  }
});

/*
  connection.query(emailExistsQuery, function(err, mail) {
    var emailExists = mail.length === 1;
    if (emailExists) {
      res.render('login', {
        title: 'ログイン',
        emailExists: '登録されていないメールアドレスです。'
      });
    } else {
      res.redirect('/');
    }
  });
*/
/*
  connection.query(query, function(err, rows) {
    res.redirect('/login');
  });
*/

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
