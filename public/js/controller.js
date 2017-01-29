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

$scope.onCheckBoxChange = function () {
  console.log("onCheckBoxChange start");
  console.log($scope.list.todos[32]);
  // $scope.onCheckBoxChangeResult = "Check1 is " + ($scope.todo.done);
};

});
