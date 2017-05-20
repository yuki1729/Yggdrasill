var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  res.render('vue',"");
});

router.post('/', function(req, res, next) {
  var m1 = moment(req.body.start_date, "YYYY/MM/DD HH:mm");
  var m2 = moment(req.body.finish_date, "YYYY/MM/DD HH:mm");

  var listValue = {
      subject: req.body.title,
      start_date: m1.format('YYYY-MM-DD HH:mm:ss'),
      finish_date: m2.format('YYYY-MM-DD HH:mm:ss'),
      created_by_user_id: req.session.user_id,
      created_on: 'NOW()',
      primary_limit: m2.format('YYYY-MM-DD HH:mm:ss'),
      memo: req.body.memo
  }

  var query = connection.query('INSERT INTO something SET ?', listValue, function(error, result, fields) {
      // console.log(query.sql);
      if (error) throw error;
      // Neat!

      var post_value = {
          assigned_by_user: req.session.user_id,
          something_id: result.insertId,
          assigned_to_user: Number(req.body.assigned_to_user),
          time_assigned_by: 'NOW()'
      };

      console.log(post_value);
      var query = connection.query('INSERT INTO assignment_relation SET ?', post_value, function(error, results, fields) {
          if (error) throw error;
          // Neat!
      });
      console.log(query.sql);

      // res.redirect('/');
  });


});

module.exports = router;
