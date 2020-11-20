var app = angular.module("myApp", []);

app.controller("taskCtrl", function ($scope, $http) {
  //	$scope.Tasklist =[];
  
 $scope.Addtask = function () {
         var data ={
           task_name : $scope.task_name,
           task_date : $scope.task_date
         }
         console.log(data);
         $http.post("http://localhost:3000/" + 'task',data).then(
           function () {
            console.log("success");
          },
            function (error) {
             console.log("Error");
           }
    );
  }
     

  
  $scope.allTask = function(){
    $http.get('http://localhost:3000/task/'+'view').then(successCallback, errorCallback);
    function successCallback(response){
        $scope.tasks=response.data;
        console.log( $scope.tasks);
    }
    function errorCallback(error){
       console.log( $scope.error);
    }
  }
  

  $scope.DeleteTask = DeleteTask;
  function DeleteTask(id) {
    // var id = $scope.tasks.indexOf(task);
    // var id = id + 34;
    console.log(id);
    $http.delete('http://localhost:3000/task/'+id).then(successCallback, errorCallback);
       function successCallback(response){
           $scope.deleteId=response.data;
            console.log($scope.deleteId);
       }
       function errorCallback(error){
           console.log(error);
       }
  }

  // $scope.UpdateTask = UpdateTask;
  // function UpdateTask (task) {
  //   var index = $scope.index;

  //   $http.put("/task/:id").then(function (task) {
  //     console.log("success");
  //   });
  // };
});
