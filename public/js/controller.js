angular.module('myApp', [])
.controller('MyController', function($scope) {
$scope.task = '';
$scope.focus = function(e) {
  $(".task-detail").show();
};
$scope.blur = function(e) {
  if($scope.task == null){
    $(".task-detail").hide();
  }
};

});
