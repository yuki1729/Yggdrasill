var express = require('express');
var session = require('express-session');
var router = express.Router();

console.log("sessioncheck");
//セッションがあるかないかを判定して分岐。ルート以下のすべてのディレクトリに適用できてるかは今後検討
router.get('/ *' , function(req, res, next) {
console.log(req.session.user_id + "sessioncheck");
  if (req.session.user_id) {
    next();
  } else {
    res.redirect('/login');
    return

  }
});

module.exports = router;
exports.sessioncheck = require('./sessioncheck');
