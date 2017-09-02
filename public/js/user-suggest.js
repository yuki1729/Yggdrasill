element_template =
`<form class="form-group">
	<ul class="form-group">
		<li><input v-model="userList[0].user_name" class="form-control" placeholder="タスク"></li>
	</ul><p style="margin-left:60px;" v-for="user in userList">{{user.user_name}}</p>
</form>`;

Vue.component('user-suggest', {
	template: element_template,
	data: function() {
		return{
			 userList : ""
		}
	},
	methods: {
		loadUserList: function(){
			var self = this; // axiosのthen内でこのvue componentにアクセスするためthisを代入する。
			axios.get('/vue_test/userList', {
					// request parameter
				})
				.then(function(response) {
					self.userList = response.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	created: function(){
		// vue component 生成時に実行
		this.loadUserList();
	}
})

var vc = new Vue({
	el: '#suggest'
})
