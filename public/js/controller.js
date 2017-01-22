angular.module('myApp', [])
.controller('MyController', function($scope) {
var todoList=this;
todoList.todos = taskList;

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
