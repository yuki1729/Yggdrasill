angular.module('todoApp', [])
	.controller('TodoListController', function() {
		var todoList = this;
		todoList.date = "2016/1/1";
		todoList.todos = [{
			text: 'learn angular',
			done: true,
			date: 'today',
			due: 'today'
		}, {
			text: 'build an angular app',
			done: false,
			date: 'today',
			due: 'today'
		}, {
			text: 'Task 3',
			done: false,
			date: 'today',
			due: 'today'
		}];

		todoList.addTodo = function() {
			// date convert
			var d = todoList.date;
			var d2 = ckDate(d);
			var dt = d2.toLocaleString();
			console.log(d2);
			var now = new Date();
			todoList.todos.push({
				text: todoList.todoText,
				done: false,
				date: todoList.date,
				due: dt
			});
			todoList.todoText = '';
			todoList.date = '';
			console.log("add Todo")
		};

		todoList.remaining = function() {
			var count = 0;
			angular.forEach(todoList.todos, function(todo) {
				count += todo.done ? 0 : 1;
			});
			return count;
		};

		todoList.archive = function() {
			var oldTodos = todoList.todos;
			todoList.todos = [];
			angular.forEach(oldTodos, function(todo) {
				if (!todo.done) todoList.todos.push(todo);
			});
		};

		function ckDate(datestr) {
			// 正規表現による書式チェック
			// yyyy/mm/ddであるか
			var dd = /^([12][0-9]|3[01]|0?[1-9])$/;
			var mmdd = /^(0?[1-9]|1[0-2])(\/|-|)([12][0-9]|3[01]|0?[1-9])$/;
			var yyyymmdd = /^([12]\d{3}|\d{2})(\/|-|)(0?[1-9]|1[0-2])(\/|-|)([12][0-9]|3[01]|0?[1-9])$/;
			var now = new Date(); // yyyymmddとyymmddを含む

      var hhmm = /^(0?[0-9]|1[0-9]|2[0-3])(:)([0-5]?[0-9])$/;

			if (datestr.match(dd)) {
				if (datestr < now.getDate()) {
					m = now.getMonth() + 1;
				} else {
					m = now.getMonth();
				}
				var vaildDate = new Date(now.getFullYear(), m, datestr);
			} else if (datestr.match(mmdd)) {
				// 2016/02/11 に 0201の入力があった場合、 2017/02/01で無く、2016/02/01になってしまう(日付での期日超過判定を追記する必要あり)
				var result = datestr.match(mmdd);
				m = result[1];
				d = result[3];
				if (m < now.getMonth() + 1) {
					y = now.getFullYear() + 1;
				} else {
					y = now.getFullYear();
				}
				var vaildDate = new Date(y, m - 1, d);
			} else if (datestr.match(yyyymmdd)) {
				var result = datestr.match(yyyymmdd);
				y = Number(result[1]);
				m = result[3] - 1;
				if (y < 99) {
					y = 2000 + y;
				}
				var vaildDate = new Date(y, m, result[5]);

			} else if(datestr.match(hhmm)){
        var result = datestr.match(hhmm);
        var vaildDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(),result[1],result[3]);
        if(vaildDate < now){vaildDate.setDate(vaildDate.getDate()+1)}
      }
			return vaildDate;
		}
	});
