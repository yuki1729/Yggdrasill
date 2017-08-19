element_template =
`<form class="form-group">
	<ul class="form-group">
		<li><input v-model="userList" class="form-control" placeholder="タスク"></li>
	</ul><p>{{userList}}</p>
</form>`;
var user1 = "test user";
Vue.component('user-suggest', {
	template: element_template,
	data: function() {
		return{
			 userList : "init	"
		}
	},
	methods: {
		loadUserList: function(){
			axios.get('/vue_test/userList', {
				})
				.then(function(response) {
					console.log("get response data");
					console.log(response.data[0].user_name);
					console.log(this);
					user1 = response.data[0].user_name;
					// window.foo = "bar";
					// console.log(this);
					// console.log(this.foo);
					//user1 = response.data[0].user_name;
					// console.log(vc);
					// this.userList.$set("test") //response.data[0].user_name;
					//this.$set(this.data, "userList",response.data[0].user_name);
					// this.$forceUpdate();
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		test:function(){
			console.log("test function");
		}
	},
	created: function(){
		console.log("create user list");
		this.loadUserList();
		this.userList = "created"
	},
	mounted: function () {
		console.log("mounted");
		this.userList = "mounted"
		this.test();
	}
})

var vc = new Vue({
	el: '#suggest'
})
//vc.userList = "test";
//Vue.set(vc.$data,"useerList","aaa")
