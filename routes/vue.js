var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  res.render('vue',"");
});

router.post('/something', function(req, res, next) {
    var action = req.body.actionbtn
    // var session = req.body.sessionbtn
    var now = "NOW()"
    //something 追加
    if (action === "action") { //somethingがactionとして登録される場合
        console.log("-------------------post action -------------------")
        var m1 = moment(req.body.start_date, "YYYY/MM/DD HH:mm:ss");
        var m2 = moment(req.body.finish_date, "YYYY/MM/DD HH:mm:ss");

        var listValue = {
            subject: req.body.subject,
            start_date: m1.format('YYYY-MM-DD HH:mm:ss'),
            finish_date: m2.format('YYYY-MM-DD HH:mm:ss'),
            created_by_user_id: req.session.user_id,
            primary_limit: m2.format('YYYY-MM-DD HH:mm:ss'),
            memo: req.body.memo
        }
        //SQL文へ文字列のNOWを投げる方法がわからない
        console.log(listValue);
        // assignment_relationテーブルへの登録
        var query = connection.query('INSERT INTO something SET ? , `created_on` = NOW()', listValue, function(error, result, fields) {
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


module.exports = router;
