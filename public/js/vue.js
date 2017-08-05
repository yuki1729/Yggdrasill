

  new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: '123456789'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var userdata = new Vue({
  el: '#user-data',
  data: {
    user_id: 'testid',
    user_name: 'testname',
    user_mail: 'testmail'
  }
})

var userdata2 = new Vue({
  el: '#user-data2',

  data: {
    user_id: 'testid',
    user_name: 'testname',
    user_mail: 'testmail'
  }
})
axios.get('/setting/userdate')
  .then(function (response) {
    console.log(response);
    var userdata3 = new Vue({
      el: '#user-data3',

      data: {
        user_id: userId,
        user_name: 'testname',
        user_mail: 'testmail'
      }
    })
  })
  .catch(function (error) {
    console.log(error);
  })
