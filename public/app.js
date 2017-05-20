var addTask = new Vue({
	el: '#addTask',
	data: {
		subject: "",
		target: "",
		start_date: "",
		deadline: "",
		earliest_start_time: "",
		assigned_to_user: "",
    counter: 0
	},
	methods:{
		postTask: function (event) {
			// メソッド内の `this` は、 Vue インスタンスを参照します
			console.log('Hello ' + this.subject + '!')
			// `event` は、ネイティブ DOM イベントです
			$http({
		  method: 'POST',
		  url: '/',
		  data: {
				subject: this.subject,
				start_date: this.deadline
		   }
		  }
		}
	}
});
