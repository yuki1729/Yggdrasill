element_template2 =
`<p style="margin-left:60px;" v-for="task in taskList">{{task.subject}}</p>`;

Vue.component('task-list', {
  template: element_template2,
  data: function() {
    return{
       taskList : ""
    }
  },
  methods: {
    loadTaskList: function(){
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
    this.loadTaskList();
  }
})

var vc = new Vue({
  el: '#tasks'
})
