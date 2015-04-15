angular.module('types', ['ionic'])
    .controller('typeCtrl', function($scope, $http){
       $scope.data = {};

       $http.get('http://192.168.0.5:9000/types')
           .success(function(data){
              $scope.data.types = data;
           })
           .error(function(error){
              $scope.data.error = error;
           });
    })
    .directive('typesList', function(){
       return {
          restrict: 'E',
          templateUrl: 'types/types-list.html'
       };
    });