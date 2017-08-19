var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

temphtml =
`<form class="form-group">
	<ul class="form-group">
		<label class="control-label" for="task">アクションの内容</label></li>
		<li><input v-model="subject" class="form-control" placeholder="タスク"></li>
		<li><input v-model="target" class="form-control" placeholder="相手先"></li><br>
	</ul>
	<ul class="form-group">
		<label class="control-label">期限</label>
		<li><input v-model="earliest_start_time" class="form-control" placeholder="開始可能日時"></li>
		<li><input v-model="deadline" class="form-control" placeholder="完了期限"></li><br>
	</ul>
	<ul class="form-group">
		<input v-model="assigned_to_user" placeholder="担当者">
		<div class="form-group">
				<label class="control-label" for="incharge">メモ</label><br>
				<textarea  v-model="memo" name="memo" rows="4" cols="40" placeholder="アクションの補足などを入力します" class="form-control"></textarea>
		</div>
		<input type="button" value="送信" v-on:click="postTask()">
	</ul>
</form>`;

tempfetchtask =
`<form class="form-group">
	<ul class="form-group">
		<label class="control-label" for="task">アクションの内容</label></li>
		<li><input v-model="subject" class="form-control" placeholder="タスク"></li>
		<li><input v-model="target" class="form-control" placeholder="相手先"></li><br>
	</ul>
	<ul class="form-group">
		<label class="control-label">期限</label>
		<li><input v-model="earliest_start_time" class="form-control" placeholder="開始可能日時"></li>
		<li><input v-model="deadline" class="form-control" placeholder="完了期限"></li><br>
	</ul>
	<ul class="form-group">
		<input v-model="assigned_to_user" placeholder="担当者">
		<div class="form-group">
				<label class="control-label" for="incharge">メモ</label><br>
				<textarea  v-model="memo" name="memo" rows="4" cols="40" placeholder="アクションの補足などを入力します" class="form-control"></textarea>
		</div>
		<input type="button" value="取得" v-on:click="postFetchTask()">
	</ul>
</form>`;



Vue.component('testform', {
  template: temphtml,
	data: function() {
		var subject = "test" + moment().format('MMMDo h:mm:ss');
		var now = moment();
		var m_deadline = moment({ hour:17, minute:00 });
		console.log("define " + m_deadline);
		return {
			subject: subject,
			target: "testさん",
			earliest_start_time: now.format("YYYY-MM-DD HH:mm:ss"),
			deadline: m_deadline.format("YYYY-MM-DD HH:mm:ss"),
			deadline_m: m_deadline,
			start_date: "",
			assigned_to_user: "",
			counter: 0,
			memo:""
		}
	},
	methods: {
		postTask: function(event) {
			// メソッド内の `this` は、 Vue インスタンスを参照します
			console.log('post task ' + this.subject)
			console.log("this.deadline:" + this.deadline)
			// `event` は、ネイティブ DOM イベントです
			axios.post('/test/testpost', {
					subject: this.subject,
					earliest_start_time: this.earliest_start_time,
					deadline: this.deadline,
					actionbtn: "action",
					assigned_to_user: 2,
					memo: this.memo
				})
				.then(function(response) {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		updateUser: function (e) {
			console.log(e);

		}
	}
})
var vm = new Vue({
	el: '#test'
})


Vue.component('fetchtask', {
  template: tempfetchtask,
	created() {
    console.log('created fetchtask');
    axios.post('/test/taskpost', {
        subject: this.subject,
        earliest_start_time: this.earliest_start_time,
        deadline: this.deadline,
        actionbtn: "action",
        assigned_to_user: 2,
        memo: this.memo
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
	},
	methods: {
		postFetchTask: function(event) {
			// メソッド内の `this` は、 Vue インスタンスを参照します
			console.log('post fetchtask');
			// `event` は、ネイティブ DOM イベントです
			axios.post('/test/taskpost', {
					subject: this.subject,
					earliest_start_time: this.earliest_start_time,
					deadline: this.deadline,
					actionbtn: "action",
					assigned_to_user: 2,
					memo: this.memo
				})
				.then(function(response) {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		updateUser: function (e) {
			console.log(e);

		}
	}
})
var task = new Vue({
	el: '#task'
})
