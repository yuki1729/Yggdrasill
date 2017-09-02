var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // è¿½åŠ
var debug = false; // debugモードの切り替え

router.get('/', function(req, res, next) {
  // 割当先ユーザーIDを取得
  var query = 'SELECT *, DATE_FORMAT(start_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS start_date, DATE_FORMAT(finish_date, \'%Y年%m月%d日 %k時%i分%s秒\') AS finish_date FROM something inner join assignment_relation on something.id = assignment_relation.something_id';
  sqlQuery = connection.query(query, function(err, rows) {
    //完了状態のタスクを下方にソート // 順番もDATE_FORMATもangularjsにそのままの値渡してそちらで処理したほうが良いかも
    rows.sort(function(a,b){
      if(a.done<b.done) return -1;
      if(a.done>b.done) return 1;
    })
    res.render('index', {
      taskList: rows
    });
  });
  // console.log(sqlQuery.sql);
});



router.post('/', function(req, res, next) {
    var action = req.body.actionbtn
    var session = req.body.sessionbtn

    //モーダルウインドウのアクションのタブから入力された内容をDBに送信
    if (action === "action") {
        console.log("**********" + req.body.actionbtn);
        console.log("-------------------Actionのpost-------------------")
        console.log(req.body)
        var m1 = moment(req.body.start_date, "YYYY/MM/DD HH:mm");
        var m2 = moment(req.body.finish_date, "YYYY/MM/DD HH:mm");

        var listValue = {
            subject: req.body.subject,
            start_date: m1.format('YYYY-MM-DD HH:mm:ss'),
            finish_date: m2.format('YYYY-MM-DD HH:mm:ss'),
            created_by_user_id: req.session.user_id,
            created_on: 'NOW()',
            primary_limit: m2.format('YYYY-MM-DD HH:mm:ss'),
            memo: req.body.memo
        }
        //SQL文へ文字列のNOWを投げる方法がわからない
        console.log(listValue);
        // assignment_relationテーブルへの登録
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

            res.redirect('/');
        });
        console.log(query.sql);

    }

    //モーダルウインドウのセッションのタブから登録された内容をDBに送信
    else if (session === "session") {
        console.log("-------------------Sessionのpost-------------------")
        console.log("**********" + req.body.sessionbtn + "**********");



        var m1 = moment(req.body.session_start, "YYYY/MM/DD HH:mm");
        var m2 = moment(req.body.session_finish, "YYYY/MM/DD HH:mm");

        var listValue = {
            session_subject: req.body.session_subject,
            session_start: m1.format('YYYY-MM-DD HH:mm:ss'),
            session_finish: m2.format('YYYY-MM-DD HH:mm:ss'),
            session_user_id: req.session.user_id,
            session_created: 'NOW()',
            session_member: req.session.session_member
        }
        //SQL文へ文字列のNOWを投げる方法がわからない
        console.log(listValue);
        // assignment_relationテーブルへの登録
        var query = connection.query('INSERT INTO session SET ?', listValue, function(error, result, fields) {
            // console.log(query.sql);
            if (error) throw error;
            // Neat!

            res.redirect('/');
        });

    } else {
        console.log("elseにいったらこっち");
        res.redirect('/');
        return;
    };

});

// タスクをアップデート
router.post('/update', function(req, res, next) {
  console.log("req.body");
  console.log(req.body);
  var updateValue = {
    subject: req.body.subject,
    start_date: req.body.start_date,
    finish_date: req.body.end_date,
    primary_limit: req.body.end_date,
    memo: req.body.memo
  }
  var query = connection.query('UPDATE `something` SET ? WHERE id = ?', [updateValue,req.body.taskId], function (error, results, fields) {
  if (error) throw error;
  // console.log(error);
  // Neat!
  });

  // });

});

router.post('/changeSomethingState', function(req, res, next) {
  console.log("----------post----------");
  console.log(req.body.id);
  var query = "UPDATE `something` SET `done`='" + req.body.done +"' WHERE `id`='" + req.body.id +"'";
  connection.query(query, function(err, rows) {
    console.log("----------task done database post----------");
  });

});

//task追加post
router.post('/inputtaskpost', function(req, res, next) {
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

module.exports = router;
