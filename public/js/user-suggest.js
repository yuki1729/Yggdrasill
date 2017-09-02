element_template =
`<form class="form-group">
	<ul class="form-group">
		<li><input v-model="userList[0].user_name" class="form-control" placeholder="タスク"></li>
	</ul>
	<p style="margin-left:60px;" v-for="id in taskList">{{something.subject}}</p>
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
