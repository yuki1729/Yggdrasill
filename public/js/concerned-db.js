element_template =
`<div><p v-for="concern in concernedList">{{concern.nickname}}{{concern.at_name}}</p></div>`;

Vue.component('concerned', {
  template: element_template,
  data: function() {
    return{
       concernedList : ""
    }
  },
  methods: {
    loadConcernedList: function(){
      var self = this; // axiosのthen内でこのvue componentにアクセスするためthisを代入する。
      axios.get('/concerned/concernedList', {
        })
        .then(function(response) {
          self.concernedList = response.data;
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created: function(){
    // vue component 生成時に実行
    this.loadConcernedList();
  }
})

var vc = new Vue({
  el: '#concerned'
})