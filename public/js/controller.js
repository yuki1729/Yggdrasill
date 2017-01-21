angular.module('myApp', [])
.controller('MyController', function($scope) {
$scope.task = '';
$scope.focus = function(e) {
  console.log(e);
  $(".task-detail").show();
};
$scope.blur = function(e) {
  console.log(e);
  $(".task-detail").hide();
};

});
