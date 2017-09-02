element_template =
`
<form class="form-group">
	<ul class="form-group">
		<li><input v-model="user" class="form-control" placeholder="user nickname" autocomplete="on" list="user-list"></li>
		<datalist id="user-list">
			<option v-for="user in userList" v-bind:value="user.user_name"  v-bind:label="user.user_name"></option>
		</datalist>
	</ul>
</form>
`; // datalistのIDが固定のため2箇所以上で使用すると問題が生じる可能性あり

Vue.component('user-suggest', {
	template: element_template,
	data: function() {
		return{
			 userList : "",
			 user : ""
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
