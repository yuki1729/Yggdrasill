var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ

router.get('/', function(req, res, next) {
  res.render('test',
  { title: 'test',
    task:'test'
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});

router.post('/testpost', function(req, res, next) {

  if (debug){ //デバッグモード時はログインしていなくてもid1でログインしたことにする
    if (req.session.user_id == null ) req.session.user_id =1;
  }
	var action = req.body.actionbtn
	// var session = req.body.sessionbtn
	//something 追加
	if (action === "action") { //somethingがactionとして登録される場合
		console.log("-------------------post action -------------------")
		var listValue = {
			subject: req.body.subject,
			due_date:req.body.deadline,
			start_date: req.body.earliest_start_time,
			finish_date: null,
			created_by_user_id: req.session.user_id,
			updated_by: null,
			done: 0,
			primary_limit: req.body.deadline,
			memo: req.body.memo
		}
		console.log(listValue);
		var query = connection.query('INSERT INTO something SET ? , `created_on` = NOW()', listValue, function(error, result, fields) {
			if (error) throw error;

			// assignment_relationテーブルへの登録
			var post_value = {
				assigned_by_user: req.session.user_id,
				something_id: result.insertId,
				assigned_to_user: Number(req.body.assigned_to_user),
				time_assigned_by: 'NOW()'
			};

			var query = connection.query('INSERT INTO assignment_relation SET ?', post_value, function(error, results, fields) {
				if (error) throw error;
			});


			res.redirect('/');
		});
		console.log(query.sql);

	}
});

module.exports = router;
