angular.module('myApp', [])
.controller('MyController', ['$scope', '$http', function($scope, $http) {
var todoList=this;
todoList.todos = taskList;

// ホーム画面上部のタスク登録部分の表示を一部隠す/全て表示を切り替え
$scope.task = '';
$scope.focus = function(e) {
  $(".task-detail").show();
};
$scope.blur = function(e) {
  if($scope.task == null){
    $(".task-detail").hide();
  }
};

// Taskの完了状態を切替
$scope.onCheckBoxChange = function (taskIndex) {
  console.log("onCheckBoxChange start");
  console.log(taskIndex);
  console.log($scope.list.todos[taskIndex].subject);
  console.log($scope.list.todos[taskIndex].something_id);
  // console.log($scope.list.todos[a].done);
  // $scope.onCheckBoxChangeResult = "Check1 is " + ($scope.todo.done);
  $http({
  method: 'POST',
  url: '/changeSomethingState',
  data: {
    id: $scope.list.todos[taskIndex].something_id,
    done : $scope.list.todos[taskIndex].done
   }
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

//Taskを選択状態に
$scope.selectTask = function (taskIndex) {
  console.log("task clicked: "+ taskIndex);
  something = $scope.list.todos[taskIndex];
  $scope.subject = something.subject;
  $scope.assigned_to_user = something.assigned_to_user
  $scope.start_date = something.start_date;
  $scope.finish_date = something.finish_date;
  $scope.primary_limit = something.primary_limit;
  $scope.memo = something.memo;
  $scope.taskIndex = taskIndex;
  $scope.taskId = $scope.list.todos[$scope.taskIndex].something_id;
  $("#sidebarTaskEdit").removeClass("hidden");
};

// Subject内でEnterを押下時に更新を掛ける
$scope.editTaskHandleKeydown = function(e,subject){
  if (e.which === 13) {
    console.log("task edit form enter:" + subject);
    taskUpdate();
 }
}

//更新ボタンを押すことで現在選択しているタスクをアップデート
$scope.taskUpdate = function() {
console.log("task update run from submit " + $scope.taskIndex );
console.log(this);
$http({
method: 'POST',
url: '/update',
data: {
  taskId: this.taskId,
  subject : this.subject,
  start_date: this.start_date,
  finish_date: this.finish_date,
  primary_limit: this.primary_limit,
  memo: this.memo
 }
})
}

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
