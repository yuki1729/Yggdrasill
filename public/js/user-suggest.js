element_template =
`<form class="form-group">
	<ul class="form-group">

	</ul>
	<table class="table">
		<thead class="thead-inverse">
				<tr>
						<th>#</th>
						<th>タスク</th>
						<th>開始可能日時</th>
						<th>延期不能日時</th>
						<th>担当</th>
						<th>メモ</th>
						<th>状態</th>
						<th>割当先</th>
				</tr>
		</thead>


</table>
<table>
<tr>
<th>#</th>
<th><div v-for="task in taskList"> {{task.id}} </div></th>
<th><div v-for = "task in taskList"> {{task.subject}}</div></th>
<th><div v-for = "task in taskList"> {{task.start_date}}</div></th>
<th><div v-for = "task in taskList"> {{task.finish_date}}</div></th>
<th><div v-for = "task in taskList"> {{task.action_to}}</div></th>
<th><div v-for = "task in taskList"> {{task.memo}}</div></th>
<th><div v-for = "task in taskList"> {{task.done}}</div></th>
<th><div v-for = "task in taskList"> {{task.assigned_to_user}}</div></th>
</tr>
</table>


</form>`;

Vue.component('task-list', {
	template: element_template,
	data: function() {
		return{
			 taskList : ""
		}
	},
	methods: {
		loadtaskList: function(){
			var self = this; // axiosのthen内でこのvue componentにアクセスするためthisを代入する。
			axios.get('/vue_test/taskList', {
					// request parameter
				})
				.then(function(response) {
					self.taskList = response.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	created: function(){
		// vue component 生成時に実行
		this.loadtaskList();
	}
})


var vt = new Vue({
	el: '#task-list'
})
