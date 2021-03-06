var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ
var crypto = require('crypto');

router.post('/', function(req, res, next) {
  var register_username = req.body.username;
  var register_mail = req.body.username;
  var register_password = req.body.password;

  //register_passwordの暗号化
    var cipher = crypto.createCipher('aes-256-cbc',register_password);
    var crypto_password = cipher.update(register_password, 'utf8', 'hex');
    crypto_password +=  cipher.final('hex') ;

  console.log("register_username: " + register_username);

    var query = 'SELECT id FROM mydb.user WHERE user_name = "' + register_username + '" OR mail = "' + register_mail +'" AND password = "' + crypto_password + '" LIMIT 1';

  /*MySQLで動くSQL文
  SELECT * FROM mydb.user;
  SELECT id FROM mydb.user WHERE user_name = 'igaki' OR mail = 'gymtaka@gmail.com' AND password =  '7e953ce6ce197ab31f16facdc3f403f4' LIMIT 1;
  */

//ログイン時の処理。ユーザーネームとメールアドレスの重複のチェックが不十分なので作り込む必要がある
//三項演算子で、user_idを取得している。rows[0].idに値が入っていればtrue、そうでなければfalse
  connection.query(query, function(err, rows) {
    var userId = rows.length? rows[0].id: false;
    console.log("login user id :" + userId);
    if (userId) {
      req.session.user_id = userId;
      res.redirect('/');
      return;
    } else {
      res.render('login', {
        title: 'ログイン',
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    }


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
