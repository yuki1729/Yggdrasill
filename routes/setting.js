var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('setting',
  { title: 'setting',
    task:'setting'
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});


module.exports = router;
