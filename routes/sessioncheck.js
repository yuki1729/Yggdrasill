var express = require('express');
var session = require('express-session');
var router = express.Router();

//セッションがあるかないかを判定して分岐
router.get('/ *' , function(req, res, next) {
  if (req.session.user_id) {
    next();
  } else {
    res.redirect('/login');
    return

  }
});

module.exports = router;
exports.sessioncheck = require('./sessioncheck');
