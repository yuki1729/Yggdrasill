var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('vuetest',
  { title: 'vuetest',
    task:'vuetest'
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});


module.exports = router;
