angular.module('myApp', [])
.controller('MyController', ['$scope', '$http', function($scope, $http) {
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

$scope.onCheckBoxChange = function (a) {
  console.log("onCheckBoxChange start");
  console.log(a);
  console.log($scope.list.todos[a].subject);
  console.log($scope.list.todos[a].id);
  // console.log($scope.list.todos[a].done);
  // $scope.onCheckBoxChangeResult = "Check1 is " + ($scope.todo.done);
  $http({
  method: 'POST',
  url: '/a',
  data: { id: $scope.list.todos[a].id }
  }
  )
  // 通信成功時の処理
  .success(function(data, status, headers, config){
  console.log("http request success");
  $scope.result = data;
  })
  // 通信失敗時の処理
  .error(function(data, status, headers, config){
    console.log("http request error");
  $scope.result = '!!通信に失敗しました!!';
  });

};

var module = angular.module('myApp');

module.config(function ($httpProvider) {
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }
});

}]);
