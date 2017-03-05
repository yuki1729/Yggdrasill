var express = require('express');
var router = express.Router();

router.get('/welcome', function(req, res, next) {
  req.session.destroy();
  console.log("ifの前");
});
