var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ
var debug = false; // debugモードの切り替え
router.get('/', function(req, res, next) {
  //sqllog確認ここから
  var query = 'SELECT *, DATE_FORMAT(start_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS start_date, DATE_FORMAT(finish_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS finish_date FROM something inner join assignment_relation on something.id = assignment_relation.something_id';
  sqlQuery = connection.query(query, function(err, rows) {
    //完了状態のタスクを下方にソート // 順番もDATE_FORMATもangularjsにそのままの値渡してそちらで処理したほうが良いかも
    rows.sort(function(a,b){
      if(a.done<b.done) return -1;
      if(a.done>b.done) return 1;
    })
  });
  console.log("query sql " + sqlQuery.sql);
    //sqllog確認ここまで
  res.render('test',
  { title: 'test',
    task:'test'
  }
  //renderでテンプレートエンジンを指定、受け渡し数値をその中に記載
);
});

router.post('/testpost', function(req, res, next) {
console.log("-------------------post action start-------------------")
  if (debug){ //デバッグモード時はログインしていなくてもid1でログインしたことにする
    if (req.session.user_id == null ) req.session.user_id =1;
  }
console.log("-------------------post action if(debug)end-------------------")
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
//task一覧取得postメソッド
router.post('/taskpost', function(req, res, next) {
  console.log("-------------------fetchtask action start-------------------")
  var query = 'SELECT id, user_name FROM user';
  sqlQuery = connection.query(query, function(err, rows) {
    console.dir(rows);
    res.send(rows);
  });
/*
console.log("-------------------fetchtask action start-------------------")
  if (debug){ //デバッグモード時はログインしていなくてもid1でログインしたことにする
    if (req.session.user_id == null ) req.session.user_id =1;
  }
console.log("-------------------fetchtask action if(debug)end-------------------")
	var action = req.body.actionbtn
	// var session = req.body.sessionbtn
	//something 追加
	if (action === "action") { //somethingがactionとして登録される場合
		console.log("-------------------fetchtask action -------------------")
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
    var query = 'SELECT *, DATE_FORMAT(start_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS start_date, DATE_FORMAT(finish_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS finish_date FROM something inner join assignment_relation on something.id = assignment_relation.something_id';
    sqlQuery = connection.query(query, function(err, rows) {
      //完了状態のタスクを下方にソート // 順番もDATE_FORMATもangularjsにそのままの値渡してそちらで処理したほうが良いかも
      rows.sort(function(a,b){
        if(a.done<b.done) return -1;
        if(a.done>b.done) return 1;
      })
    });
		console.log(sqlQuery.sql);

	}
*/
});


module.exports = router;
