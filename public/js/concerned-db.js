element_template =
`<div>
<table class="table col-md-12">
        <thead class="thead-inverse">
          <tr>
            <!-- <th>#</th> -->
            <th>名前（Nickname）</th>
            <th>メンション（@name）</th>
            <th>ステータス</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="concern in concernedList" class="concerned_table">
            <!-- <th scope="row"><div class="checkbox"><label><input type="checkbox" value=""></label></div></th> -->
            <td>{{concern.nickname}}</td>
            <td>{{concern.at_name}}</td>
            <td>ログイン中</td>
            <td><a v-bind:href.literal="'concerned_edit/' + concern.id" class="btn btn-info btn-xs">edit</a></center></td>
            <td><form name="delete_concerned" action="/concernedList/delete" method="post"><input type="hidden" name="delete" v-bind:value="concern.id"></form><a class="btn btn-danger btn-xs" onclick="document.delete_concerned.submit();return false;">delete</a></td>
          </tr>
        </tbody>
      </table></div>`;

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
    },
    // deleteConcerned: function(id){
    //   axios.delete('/concerned/concernedList/'+id, {

    //   })
    // }
  },
  created: function(){
    // vue component 生成時に実行
    this.loadConcernedList();
  }
})

var vc = new Vue({
  el: '#concerned'
})