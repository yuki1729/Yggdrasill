element_template =
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

// 登録する
Vue.component('task-edit', {
	template: element_template,
	data: function() {
		var subject = "dev" + moment().format('MMMDo h:mm:ss');
		var now = moment();
		var m_deadline = moment({ hour:17, minute:00 });
		console.log("define " + m_deadline);
		return {
			subject: "",
			target: "",
			earliest_start_time: "",
			deadline: "",
			start_date: "",
			assigned_to_user: "",
			counter: 0,
			memo:""
		}
	},
	methods: {
		getSomething: function(something_id) {
			var something_id =291;
			var self = this; // axiosのthen内でこのvue componentにアクセスするためthisを代入する。
			
			// メソッド内の `this` は、 Vue インスタンスを参照します
			// `event` は、ネイティブ DOM イベントです
			axios.get('/vue_test/something/'+something_id, )
				.then(function(response) {
					res = response.data[0];
					self.subject = res.subject;
					self.earliest_start_time = res.start_date;
					self.deadline = res.due_date;
					self.memo = res.memo;

				})
				.catch(function(error) {
					console.log(error);
				});

		},
		updateUser: function (e) {
			console.log(e);

		}
	},
	created: function(){
		// vue component 生成時に実行
		this.getSomething();
	}
})
// root インスタンスを作成する
var vm = new Vue({
	el: '#task'
})


/* α版では使用しない
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
*/
