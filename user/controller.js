var app = angular.module("myApp", []);

app.controller("taskCtrl", function ($scope, $http) {
  //	$scope.Tasklist =[];
  
 $scope.Addtask = function () {
         var data ={
           task_name : $scope.task_name,
           task_date : $scope.task_date
         }
         console.log(data);
         $http.post("https://taskapp-karan.herokuapp.com/" + 'task',data).then(
        //  "http://localhost:3000/" + 'task',data
           function () {
            console.log("success");
          },
            function (error) {
             console.log("Error");
           }
    );
  }
     

  
  $scope.allTask = function(){
    $http.get('https://taskapp-karan.herokuapp.com/task/'+'view').then(successCallback, errorCallback);
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
    $http.delete('https://taskapp-karan.herokuapp.com/task/'+id).then(successCallback, errorCallback);
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
