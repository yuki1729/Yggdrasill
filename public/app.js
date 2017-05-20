var addTask = new Vue({
	el: '#addTask',
	data: {
		subject: "testAAA",
		target: "",
		start_date: "2017/05/20",
		deadline: "2017/05/20",
		earliest_start_time: "2017/05/20",
		assigned_to_user: "",
    counter: 0
	},
	methods:{
		postTask: function (event) {
			// メソッド内の `this` は、 Vue インスタンスを参照します
			console.log('Hello ' + this.subject + '!')
			// `event` は、ネイティブ DOM イベントです
			axios.post('/', {
			subject: this.subject,
			start_date: this.deadline,
			actionbtn: "action",
			assigned_to_user: 2
	  })
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

		}
	}
});
