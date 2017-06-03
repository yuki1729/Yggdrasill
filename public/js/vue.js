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
