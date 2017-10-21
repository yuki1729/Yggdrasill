element_template =
`<form class="form-group"><p style="margin-left:60px;" v-for="task in taskList">{{task.subject}}</p></form>`;

Vue.component('task-list', {
  template: element_template,
  data: function() {
    return{
       taskList : ""
       // taskList2 : ""
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
          console.log(response);
          // self.taskList2 = response.data[0];
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
