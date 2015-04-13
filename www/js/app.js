angular.module('app', ['ionic'])
    .controller('typeCtrl', function($scope, $http){
      $scope.data = {};

      $http.get('http://localhost:9000/types')
          .success(function(data){
            $scope.data.types = data;
          })
          .error(function(error){
            $scope.data.error = error;
          });
    });