var express = require('express');
var session = require('express-session');
var router = express.Router();
console.log("セッションチェックテスト");
//セッションがあるかないかを判定して分岐。routes以下の全部にかける方法は要検討
router.get('/' , function(req, res, next) {
console.log("ifの前");
  if (req.session.user_id) {
    next();
  } else {
console.log("elseの後");
    res.redirect('/login');
    return

  }
});

module.exports = router;
exports.sessioncheck = require('./sessioncheck');
