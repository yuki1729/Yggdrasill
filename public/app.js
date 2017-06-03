temp =
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

	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-10">
			<label class="control-label">繰り返し設定</label><br>
			<input type="radio" name="毎月" value="monthly">毎月
			<input type="radio" name="毎週" value="weekly">毎週
			<input type="radio" name="毎日" value="dayily">毎日
			<div class="checkbox">
				<label><input type="checkbox" value="checkbox1"> 月曜</label>
				<label><input type="checkbox" value="checkbox2"> 火曜</label>
				<label><input type="checkbox" value="checkbox3"> 水曜</label>
				<label><input type="checkbox" value="checkbox4"> 木曜</label>
				<label><input type="checkbox" value="checkbox5"> 金曜</label>
				<label><input type="checkbox" value="checkbox6"> 土曜</label>
				<label><input type="checkbox" value="checkbox7"> 日曜</label>
			</div>
		</div>
	</div>
	<ul class="form-group">
		<input v-model="assigned_to_user" placeholder="担当者">
		<div class="form-group">
				<label class="control-label" for="incharge">メモ</label><br>
				<textarea name="memo" rows="4" cols="40" placeholder="アクションの補足などを入力します" class="form-control"></textarea>
		</div>
		<input type="button" value="送信" v-on:click="postTask()">
	</ul>
</form>`;

// 登録する
Vue.component('my-component', {
	template: temp,
	data: function() {
		var test = "dev" + moment().format('MMMDo h:mm:ss');
		var now = moment();
		var deadline = moment({ hour:17, minute:00 });

		return {
			subject: test,
			target: "井垣さん",
			earliest_start_time: now.format('MMMDo h:mm:ss'),
			deadline: deadline.format('kk:mm'),
			start_date: "",
			assigned_to_user: "",
			counter: 0
		}
	},
	methods: {
		postTask: function(event) {
			// メソッド内の `this` は、 Vue インスタンスを参照します
			console.log('post task ' + this.subject)
			// `event` は、ネイティブ DOM イベントです
			post_deadline = moment(this.deadline);
			axios.post('/vue/something', {
					subject: this.subject,
					earliest_start_time: this.now,
					deadline: post_deadline,
					actionbtn: "action",
					assigned_to_user: 2
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
// root インスタンスを作成する
new Vue({
	el: '#example'
})
