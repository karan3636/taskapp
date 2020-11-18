var app = angular.module("myApp", []);

app.controller("taskCtrl", function ($scope, $http) {
  //	$scope.Tasklist =[];

  $scope.AddTask = function () {
    // var task ={
    // 	Taskname:$scope.Taskname,
    // 	Date:$scope.Date,
    // 	Time:$scope.Time,
    // 	End:$scope.End
    // };
    // $scope.Tasklist.push(task);
    // ClearModel();
    // console.log($scope.Tasklist);
    $http.post("/task", task).then(
      function (success) {
        console.log($scope.task);
        console.log(success.status);
      },
      function (error) {
        console.log(error.status);
      }

      //status.send("task Post")
    );
  };
  $http.get("/task/view").then(function (task) {
    $scope.task = task;
    console.log(task);
  });

  $scope.DeleteTask = DeleteTask;
  function DeleteTask(task) {
    $http.delete("/api/delete/" + task).then(
      function () {
        console.log("success");
      },
      function (error) {
        console.log("Error");
      }
    );
  }

  $scope.UpdateTask = UpdateTask;
  function UpdateTask (task) {
    var index = $scope.index;

    $http.put("/task/:id").then(function (task) {
      console.log("success");
    });
  };
});
