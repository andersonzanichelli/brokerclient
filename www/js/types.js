angular.module('types', [])
    .controller('typeCtrl', function($scope, $http, configService, preferencesService){

        $scope.init = function(){
            $scope.data = {};
            var host = configService.load();

            if(host !== '') {
                var promisse = $http({method: 'GET', url: host + '/types'});

                promisse.success(function(data){
                    $scope.data.types = data;
                }).error(function(error){
                    $scope.data.error = 'Error on connect to server.';
                });
            } else {
                $scope.data.error = 'Error on connect to server.';
            }
        };

        $scope.config = function(type, params){
            preferencesService.configuration(type, params);
        }
    })
    .directive('typesList', function(){
       return {
          restrict: 'E',
          templateUrl: 'view/types/types-list.html'
       };
    });