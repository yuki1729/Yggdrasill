element_template =
`<div class="container">
  <form id="concerned_form" v-bind:action="'/concerned_edit/'+concern[0].id+'/update/'+concern[0].id"  method="post">
    <div class="form-group">
      <center>
      <label class="control-label" for="concern">あなたの関係者のメンション設定更新</label>
      <br><br>
      <li><input type="text" id="partner_user_id" class="form-control" placeholder="UserID"  v-model="concern[0].partner_user_id" name ="partner_user_id" required></li>
      <li><input type="text" id="nickname" class="form-control" placeholder="Nickname"  v-model="concern[0].nickname" name ="nickname" required></li>
      <li ><input type="text" id="at_name" class="form-control" placeholder="@name" v-bind:value="concern[0].at_name" name="at_name"></li>
      <br>
        <div class="form-group">
          <input type="submit" value="更新" class="btn btn-primary">
        </div>
      </center>
    </div>
  </form>
  <form id="concerned_form" v-bind:action="'/concerned_edit/'+concern[0].id+'/delete/'+concern[0].id"  method="post">
    <div class="form-group">
      <center>
      <label class="control-label" for="concern">あなたの関係者のメンションの削除</label>
      <br><br>
        <div class="form-group">
          <input type="submit" value="削除" class="btn btn-danger">
        </div>
      </center>
    </div>
  </form>
</div>`;

Vue.component('concernededit', {
  template: element_template,
  data: function() {
    return{
       concern : { id: 1, nickname: 'test', at_name: '@test' }
    }
  },
  methods: {
    loadEditConcerned: function(){
      var self = this; // axiosのthen内でこのvue componentにアクセスするためthisを代入する。
      axios.get(('/concerned_edit/'+location.pathname.split("/")[2]+'/edit/'+location.pathname.split("/")[2]), {
        })
        .then(function(response) {
          console.log(self.concern);
          self.concern = response.data;
          console.log(response);
          console.log(self.concern);

        })
        .catch(function(error) {
          console.log(error);
          console.log("axiosでmysqlからデータを取れなかったよ");
        });
    },
    // deleteConcerned: function(id){
    //   axios.delete('/concerned/concernedList/'+id, {

    //   })
    // }
  },
  created: function(){
    // vue component 生成時に実行
    this.loadEditConcerned();
  }
})

var vc = new Vue({
  el: '#concerned'
})