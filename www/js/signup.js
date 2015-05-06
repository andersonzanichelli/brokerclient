angular.module('signup', [])
    .controller('signupCtrl', function($scope, configService){
        $scope.host = configService.load();
    })
    .directive('signup', function(){
        return {
            restrict: 'E',
            templateUrl: 'view/signup.html'
        };
    });