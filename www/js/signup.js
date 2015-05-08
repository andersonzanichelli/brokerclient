angular.module('signup', [])
    .controller('signupCtrl', function($scope, configService){
        $scope.host = configService.load();
        $scope.didnotmatch = false;

        $scope.confirmation = function(){
            if($scope.password === $scope.confirm) {
                $scope.didnotmatch = false;
                $scope.signup();
            } else
                $scope.didnotmatch = true;
        };

        $scope.signup = function(){
            console.log("fazer registro!");
        };
    })
    .directive('signup', function(){
        return {
            restrict: 'E',
            templateUrl: 'view/signup.html'
        };
    });