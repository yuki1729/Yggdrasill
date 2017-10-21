element_template =
`<div class="container">
  <form id="concerned_form" action="/concernedList"  method="post">
    <div class="form-group" v-model="concern">
      <label class="control-label" for="concern">あなたの関係者のメンション設定更新</label>
      <center><br><br>
      <li><input type="text" id="nickname" class="form-control" placeholder="Nickname" value="concern.nickname" name ="title" required></li>
      <li><input type="text" id="partner_user_id" class="form-control" placeholder="関係者のID" value="concern.partner_usr_id" name ="title" required></li>
      <li><input type="text" id="at_name" class="form-control" placeholder="@name" v-bind:value="concern.at_name" name="action_to"></li>
      <br>
        <div class="form-group">
          <input type="submit" value="更新" class="btn btn-primary">
        </div>
      </center>
    </div>
  </form>
</div>`;

Vue.component('concerned', {
  template: element_template,
  data: function() {
    return{
       concern : ""
    }
  },
  methods: {
    loadEditConcerned: function(){
      var self = this; // axiosのthen内でこのvue componentにアクセスするためthisを代入する。
      axios.get('/concerned_edit/:id', {
        })
        .then(function(response) {
          self.concern = response.data;
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
    this.loadEditConcerned();
  }
})

var vc = new Vue({
  el: '#concerned'
})