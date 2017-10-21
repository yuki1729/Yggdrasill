var express = require('express');
var session = require('express-session');
var router = express.Router();

//セッションがあるかないかを判定して分岐。routes以下の全部にかける方法は要検討
router.get('/' , function(req, res, next) {
// console.log("ifの前");
  if (!req.session.user_id) {
    req.session.user_id =1;// セッションなければテスト用ユーザー1でログイン
    //res.redirect('/login');
    next();
    
    //return

  } else {
   next();
  }
});

module.exports = router;
exports.sessioncheck = require('./sessioncheck');
