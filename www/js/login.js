angular.module('login', [])
    .controller('loginCtrl', function($scope, configService){
        $scope.host = configService.load();
    })
    .directive('login', function(){
        return {
            restrict: 'E',
            templateUrl: 'login.html'
        };
    });