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

				<tr v-for="task in taskList">
				<td><input v-bind:id="task.id" v-bind:value="task.done" type="checkbox" v-model="task.done" v-on:click="reverseCheckBox">{{task.id}}</td>
				<td>{{task.subject}}</td>
				<td>{{task.start_date}}</td>
				<td>{{task.finish_date}}</td>
				<td>{{task.action_to}}</td>
				<td>{{task.memo}}</td>
				<td>{{task.done}}</td>
				<td>{{task.assigned_to_user}}</td>
				</tr>

		</thead>

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
			axios.get('/tasklist/taskList', {
					// request parameter
				})
				.then(function(response) {
					self.taskList = response.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		reverseCheckBox: function(e){
			console.log(e.srcElement.id);
			console.log(e.srcElement.value);
			axios.post('/tasklist/checkbox/'+e.srcElement.id+'/'+e.srcElement.value, {
					// request parameter
				})
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
