// 登録する
Vue.component('my-component', {
	template: `<div>
<input v-model="subject" placeholder="タスク">
<input v-model="target" placeholder="相手先">
<input v-model="earliest_start_time" placeholder="開始可能日時">
<input v-model="deadline" placeholder="完了期限">
<input v-model="assigned_to_user" placeholder="担当者">
<button v-on:click="postTask">post</button>
</div>`,
	data: function() {
		return {
			subject: "testAAA",
			target: "2",
			start_date: "2017/05/20",
			deadline: "2017/05/20",
			earliest_start_time: "2017/05/20",
			assigned_to_user: "",
			counter: 0
		}
	},
	methods: {
		postTask: function(event) {
			// メソッド内の `this` は、 Vue インスタンスを参照します
			console.log('post task ' + this.subject)
			// `event` は、ネイティブ DOM イベントです
			axios.post('/vue/something', {
					subject: this.subject,
					start_date: this.deadline,
					actionbtn: "action",
					assigned_to_user: 2
				})
				.then(function(response) {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});

		}
	}
})
// root インスタンスを作成する
new Vue({
	el: '#example'
})

new Vue({
	el: '#example2'
})
