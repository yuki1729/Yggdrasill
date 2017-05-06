var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); //

/* GET home page. */

router.get('/', function(req, res, next) {
 res.render('docs',
 { title: 'ドキュメント',
 });
});

module.exports = router;
exports.docs = require('./docs');
